import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Iframe from 'react-iframe'

// Supports library
import axios from 'axios';

// Components
import Timer from "./components/Timer";
import Dropdownmenu from "./components/Dropdownenu";

console.log('Location host: ', location.host);

// Css
import './main.css';
import Switcher from "./components/Switcher";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      // Settings
      ipAddress: '',
      category: 'tracks',
      view: 'projector', // projector or network

      // Bible
      books: [],
      chapters: [],
      verses: [],
      currentBookId: '',
      currentBookName: '',
      currentChapterId: '',
      currentVerseText: '',

      // tracks
      tracks: [],
      currentTrackId: '',
      currentTrackName: '',
      currentTrackText: [],
      currentTrackTextLine: '',
      allowAddingNewSong: false,

      // Favorite tracks
      favorites: [],

      // Frame
      actionFrameName: 'Название песни',
      actionFrameText: '<p>Пиши текст песни здесь</p>',
      openActionFrame: false,
    };
    this.openTextOfThisSong = this.openTextOfThisSong.bind(this);

    this.sendCurrentTrackTextWithSocket = this.sendCurrentTrackTextWithSocket.bind(this); // ws
    this.sendCurrentChapterTextWithSocket = this.sendCurrentChapterTextWithSocket.bind(this); // ws

    this.takeCurrentCategory = this.takeCurrentCategory.bind(this);
    this.updateCurrentTrackName = this.updateCurrentTrackName.bind(this);
    this.handleEditedText = this.handleEditedText.bind(this);

    // Methods for work with bible
    this.getChapters = this.getChapters.bind(this);
    this.getVersesOfChosenChapter = this.getVersesOfChosenChapter.bind(this);

    // Methods for work with tracks
    this.addSongToDb = this.addSongToDb.bind(this);
    this.takeCurrentView = this.takeCurrentView.bind(this);

    // Frame
    this.openActionFrame = this.openActionFrame.bind(this);
    this.actionFrameEnterName = this.actionFrameEnterName.bind(this);
    this.actionFrameEnterText = this.actionFrameEnterText.bind(this);
    this.actionFrameCancel = this.actionFrameCancel.bind(this);
    this.actionFrameSave = this.actionFrameSave.bind(this);
    this.actionFrameAdd = this.actionFrameAdd.bind(this);

    // Favorites
    this.addTrackToFavorite = this.addTrackToFavorite.bind(this);
    this.removeTrackFromFavorite = this.removeTrackFromFavorite.bind(this);
  }

  componentDidMount() {

    // Get tracks
    fetch(`http://${location.host}/tracks`, {mode: 'cors'})
      .then((tracks) => tracks.json())
      .then(
        (tracks) => {
          // console.log(tracks);
          this.setState({
            tracks: tracks
          });
        }
      );

    // Get favorites tracks
    fetch(`http://${location.host}/favorites`, {mode: 'cors'})
      .then((favorites) => favorites.json())
      .then(
        (favorites) => {
          // console.log(favorites);
          this.setState({
            favorites: favorites
          });
        }
      );

    // Get books
    fetch(`http://${location.host}/books`, {mode: 'cors'})
      .then((books) => books.json())
      .then(
        (books) => {
          // console.log(books);
          this.setState({
            books: books
          });
        }
      );
  }

  // Get song text by id
  openTextOfThisSong(id) {

    // Make this is server api
    const text = this.state.tracks.filter((song) => song.id === id)[0].text.split('\n');

    let currentTrackText = [];

    for (let i = 0; i < text.length; i++) {
      if (text[i] !== '') {
        currentTrackText.push(text[i]);
      }
    }

    var actionFrameText = '';

    for (let i = 0; i < text.length; i++) {
      if (text[i] !== '' && text[i] !== ',') {
        actionFrameText += text[i] + '\n';
      }
    }

    // console.log('currentTrackText', currentTrackText);
    // console.log('actionFrameText', actionFrameText);

    this.setState({
      currentTrackId: id,
      currentTrackName: this.state.tracks.filter((song) => song.id === id)[0].name,
      currentTrackText: currentTrackText,
      actionFrameName: this.state.tracks.filter((song) => song.id === id)[0].name,
      actionFrameText: actionFrameText,
    });
  }

  // WS send track text
  sendCurrentTrackTextWithSocket(currentTrackTextLine) {

    const ws = new WebSocket(`ws://${location.host}/`);

    this.setState({currentTrackTextLine: currentTrackTextLine});

    ws.onopen = () => {
      ws.send(JSON.stringify(
        {
          type: this.state.category,
          data: {
            text: this.state.currentTrackTextLine
          }
        }
      ));

      const data = JSON.stringify(
        {
          category: this.state.category,
          data: {
            text: this.state.currentTrackTextLine
          }
        }
      );

      // Update in the Db
      axios.put(`http://${location.host}/current`, {data: data})
        .then(function (reply) {
          console.log(reply.data);
          // if (reply.data.success) {
          //   this.setState({currentTrackText: newtext});
          // }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  }

  // WS send chapter text
  sendCurrentChapterTextWithSocket(verseId, currentVerseText) {

    const ws = new WebSocket(`ws://${location.host}/`);

    this.setState({currentVerseText: currentVerseText});

    ws.onopen = () => {
      ws.send(JSON.stringify(
        {
          type: this.state.category,
          data: {
            book: this.state.currentBookName,
            chapter: this.state.currentChapterId,
            id: verseId,
            text: this.state.currentVerseText
          }
        }
      ));

      const data = JSON.stringify(
        {
          category: this.state.category,
          data: {
            book: this.state.currentBookName,
            chapter: this.state.currentChapterId,
            id: verseId,
            text: this.state.currentVerseText
          }
        }
      );

      // Update in the Db
      axios.put(`http://${location.host}/current`, {data: data})
        .then(function (reply) {
          console.log(reply.data);
          // if (reply.data.success) {
          //   this.setState({currentTrackText: newtext});
          // }
        })
        .catch(function (error) {
          console.log(error);
        });

    };
  }

  // Return value of from select component
  takeCurrentCategory(value) {
    console.log(value);
    const category = value === 'Песни' ? 'tracks' : 'bible';
    this.setState({category: category});
  }

  // Change name of song
  updateCurrentTrackName(e) {
    this.setState({currentTrackName: e.target.value});
  }

  // Save edited text to Database
  handleEditedText(e) {
    console.log(e.target.value.replace(/,/g, ''));
    this.setState({text: e.target.value.replace(/,/g, '')});
  }

  // Add new song to Db
  addSongToDb() {
    this.setState({
      allowAddingNewSong: true,
      openActionFrame: true,
      actionFrameName: '',
      actionFrameText: '<p>Пиши текст песни здесь</p>',
    });
  }

  // Get chapters
  getChapters(book_number, long_name) {

    this.setState({
      currentBookId: book_number,
      currentBookName: long_name
    });

    // Get books
    fetch(`http://${location.host}/chapters?book=${book_number}`, {mode: 'cors'})
      .then((chapters) => chapters.json())
      .then(
        (chapters) => {
          // console.log(chapters);
          this.setState({
            chapters: chapters,
            currentChapterId: 1
          });

          // Get Verses on selected chapter

          axios.get(`http://${location.host}/verses?book=${this.state.currentBookId}&chapter=${this.state.currentChapterId}`)
            .then((data) => {
              console.log(data);
              this.setState({
                verses: data.data
              });
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            })
        }
      );
  }

  // Get verses
  getVersesOfChosenChapter(chapter) {
    this.setState({currentChapterId: chapter});
    // Get verses

    axios.get(`http://${location.host}/verses?book=${this.state.currentBookId}&chapter=${chapter}`)
      .then((data) => {
        console.log(data);
        this.setState({
          verses: data.data
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  // Open editor
  openActionFrame() {
    this.setState({openActionFrame: true});
  }

  // Enter the name in frame window
  actionFrameEnterName(e) {
    this.setState({actionFrameName: e.target.value})
  }

  // Enter the text in frame window
  actionFrameEnterText(e) {
    this.setState({actionFrameText: e.target.value})
  }

  // Cancel action from frame
  actionFrameCancel() {
    this.setState({openActionFrame: false})
  }

  // Save text or added song
  actionFrameSave() {

    this.setState({openActionFrame: false});

    const id = this.state.currentTrackId;
    const name = this.state.actionFrameName;
    const text = this.state.actionFrameText;

    var currentTrackText = this.state.actionFrameText.split('\n');

    this.setState({
      currentTrackName: name,
      currentTrackText: currentTrackText
    });

    // Send changes to database
    axios.put(`http://${location.host}/track`, {
      id: id,
      name: name,
      text: text
    })
      .then(function (reply) {
        console.log('reply', reply.data);
        // if (reply.data.success === true) {

        // }
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  // Save song to Db
  actionFrameAdd() {

    this.setState({
      allowAddingNewSong: false,
      openActionFrame: false,
      actionFrameName: '',
      actionFrameText: '',
    });

    const name = this.state.actionFrameName;
    let text = this.state.actionFrameText;

    const regex = /\<p>|\<\/p\>\<p>|\<\/p>/gi;
    text = this.state.actionFrameText.replace(regex, '\n');

    axios.post(`http://${location.host}/track`, {
      name: name,
      text: text
    })
      .then(function (reply) {
        console.log(reply.data);
        // if (reply.data.success) {
        //   this.setState({currentTrackText: newtext});
        // }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Take current view
  takeCurrentView(view) {
    this.setState({view: (view === 'Проектор') ? 'projector' : 'network'});
  }

  // Add to favorite
  addTrackToFavorite(id) {
    // Send changes to database
    axios.put(`http://${location.host}/favorites`, {
      id: id,
      favorite: 1
    })
      .then(function (reply) {
        console.log('reply', reply.data);
        // if (reply.data.success === true) {

        // }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Remote from favorites
  removeTrackFromFavorite(id) {
    // Send changes to database
    axios.put(`http://${location.host}/favorites`, {
      id: id,
      favorite: 0,
    })
      .then(function (reply) {
        console.log('reply', reply.data);
        // if (reply.data.success === true) {

        // }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {

    const options = {
      "category": [
        {
          id: 0,
          name: 'Песни'
        },
        {
          id: 1,
          name: 'Библия'
        }
      ],
      "fonts": {
        "names": [
          {
            id: 0,
            name: 'Montserrat'
          },
          {
            id: 1,
            name: 'Roboto'
          },
          {
            id: 2,
            name: 'Arial'
          }
        ],
        "weight": [
          {
            id: 0,
            name: 'normal'
          },
          {
            id: 1,
            name: 'bold'
          }
        ],
        "sizes": [
          {
            id: 0,
            name: '16'
          },
          {
            id: 1,
            name: '32'
          },
          {
            id: 2,
            name: '64'
          }
        ]
      },
      "views": [
        {
          id: 0,
          name: 'Проектор'
        },
        {
          id: 1,
          name: 'Сеть'
        }
      ],
    };

    const tracks =
      this.state.tracks !== undefined
        ?
        this.state.tracks.map((track) => {
          return (
            track.favorite !== 1
              ?
              <p key={track.id} onClick={() => this.openTextOfThisSong(track.id)}>
                {track.name}
                <button onClick={() => this.addTrackToFavorite(track.id)} id="action-button-add-to-favorite" title='Добавить в избранное'>
                  <span id="action-button-add-to-favorite-icon"/>
                </button>
              </p>
              :
              <p key={track.id} onClick={() => this.openTextOfThisSong(track.id)}>
                {track.name}
                <button onClick={() => this.removeTrackFromFavorite(track.id)} id="action-button-remove-from-favorite"
                        title='Удалить из избранного'>
                  <span id="action-button-remove-from-favorite-icon"/>
                </button>
              </p>
          );
        })
        :
        '';

    const books =
      this.state.books !== undefined
        ?
        this.state.books.map((book) => {
          return <p key={book.book_number}
                    onClick={() => this.getChapters(book.book_number, book.long_name)}>{book.long_name}</p>
        })
        :
        '';

    const favorites =
      this.state.favorites !== undefined
        ?
        this.state.favorites.map((track) => {
          return (
            track.favorite !== 1
              ?
              <p key={track.id} onClick={() => this.openTextOfThisSong(track.id)}>
                {track.name}
                <button onClick={() => this.addTrackToFavorite(track.id)} id="action-button-add-to-favorite" title='Добавить в избранное'>
                  <span id="action-button-add-to-favorite-icon"/>
                </button>
              </p>
              :
              <p key={track.id} onClick={() => this.openTextOfThisSong(track.id)}>
                {track.name}
                <button onClick={() => this.removeTrackFromFavorite(track.id)} id="action-button-remove-from-favorite"
                        title='Удалить из избранного'>
                  <span id="action-button-remove-from-favorite-icon"/>
                </button>
              </p>
          );
        })
        :
        '';


    return (
      <React.Fragment>

        <div id="hide-background" style={{"display": this.state.openActionFrame ? "flex" : "none"}}></div>

        <div className="column-one">
          <div className="column-one-up">
            <input type="text" id="input-find" placeholder="Поиск"/>
            <Dropdownmenu take={this.takeCurrentCategory} options={options.category}/>
          </div>
          <div className="column-one-center">
            <div id="tracks" className="tracks">
              {this.state.category !== undefined && this.state.category === 'tracks' ? tracks : books}
            </div>
            <div className="favorites">
              {/*<p className="selected-music">1. Я знаю кто я в тебе</p>*/}
              {/*<p>2. Славь душа Господа</p>*/}
              {favorites}
            </div>
          </div>
          <div className="column-one-down">

            <button id="action-button-add" onClick={this.addSongToDb} title='Добавить'>
              <span id="action-button-add-icon"/>
            </button>
            <button id="action-button-favorite" title='Избранное'>
              <span id="action-button-favorite-icon"/>
            </button>

            <button id="action-button-edit" onClick={this.openActionFrame} title='Редактировать'>
              <span id="action-button-edit-icon"/>
            </button>

            <button id="action-button-remove" title='Удалить'>
              <span id="action-button-remove-icon"/>
            </button>

          </div>
        </div>
        <div className="column-two">
          <div className="column-two-up">
            {
              this.state.category === 'tracks'
                ?
                <input
                  type="text"
                  id="input-music-name"
                  onChange={this.updateCurrentTrackName}
                  value={this.state.currentTrackName}
                  placeholder="Назване выбраной песни"
                />
                :
                <div className='selected-book-props'>
                  <p
                    className='selected-book-props-book-name'>{this.state.currentBookName !== undefined ? this.state.currentBookName : ''}</p>
                  <Dropdownmenu
                    take={this.getVersesOfChosenChapter}
                    options={this.state.chapters}
                  />
                </div>
            }
          </div>
          <div className="column-two-center">
            <div id="textarea-music-text">
              <Switcher>
                {
                  this.state.category === 'tracks'
                    ?
                    this.state.currentTrackText !== undefined && this.state.currentTrackText !== null
                      ?
                      this.state.currentTrackText.map((currentTrackTextLine, index) => {
                        return (
                          <p
                            key={index}
                            onClick={() => this.sendCurrentTrackTextWithSocket(currentTrackTextLine)}
                          >
                            {currentTrackTextLine}
                          </p>
                        )
                      })
                      :
                      <p>Выберите песню</p>

                    :
                    this.state.verses !== undefined && this.state.verses !== null
                      ?
                      this.state.verses.map((currentVerseText, verseId) => {
                        return (
                          <p
                            key={verseId}
                            onClick={() => this.sendCurrentChapterTextWithSocket(currentVerseText.verse, currentVerseText.text)}
                          >
                            {currentVerseText.verse}. {currentVerseText.text}
                          </p>
                        )
                      })
                      :
                      <p>Выберите книгу</p>
                }
              </Switcher>
            </div>
          </div>
          <div className="column-two-down"></div>
        </div>
        <div className="column-three">
          <div className="column-three-up">
            <div className="edit-text-tools">
              <Dropdownmenu options={options.fonts.names}/>
              <Dropdownmenu options={options.fonts.weight}/>
              <Dropdownmenu options={options.fonts.sizes}/>
            </div>
            <div className="output-views-roster">
              <Dropdownmenu
                take={this.takeCurrentView}
                options={options.views}
              />
            </div>
          </div>
          <div className="column-three-center">
            <div className="screen">
              {
                this.state.view === 'projector' && this.state.view !== undefined
                  ?
                  <Iframe
                    url={`http://${location.host}/screen`}
                    width="100%"
                    height="100%"
                    id="iframe-view-container"
                    className="myClassname"
                    display="initial"
                    position="relative"
                    frameBorder="0"
                    ref={this.iframe}
                  />
                  :
                  <Iframe
                    url={`http://${location.host}/remote`}
                    width="100%"
                    height="100%"
                    id="iframe-view-container"
                    className="myClassname"
                    display="initial"
                    position="relative"
                    frameBorder="0"
                    ref={this.iframe}
                  />
              }
            </div>
            <div className="screen-control">
              <button id="action-button-show-screen">
                <span id="action-button-show-screen-icon"/>
              </button>
              <button id="action-button-hide-screen">
                <span id="action-button-hide-screen-icon"/>
              </button>
            </div>
          </div>
          <div className="column-three-down">
            <span id="ip-address">{this.state.ipAddress !== '' ? this.state.ipAddress : ''}</span>
            <Timer/>
          </div>
        </div>
        <div className="action-frame-container" style={{"display": this.state.openActionFrame ? "flex" : "none"}}>
          <div className="action-frame">
            <input
              type="text"
              id="input-enter-name"
              onChange={this.actionFrameEnterName}
              value={this.state.actionFrameName}
              placeholder="Название"
            />
            <textarea
              id="textarea-input-text"
              value={this.state.actionFrameText}
              onChange={this.actionFrameEnterText}
            />
            <div className="action-frame-controls">
              <button id="action-frame-false" onClick={this.actionFrameCancel}>Отмена</button>
              {
                this.state.allowAddingNewSong
                  ?
                  <button id="action-frame-true" onClick={this.actionFrameAdd}>Добавить</button>
                  :
                  <button id="action-frame-true" onClick={this.actionFrameSave}>Сохранить</button>
              }
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));