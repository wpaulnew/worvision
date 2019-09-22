import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// Supports library
import axios from 'axios';

// Components
import ContentEditable from "./components/ContentEditable";
import Timer from "./components/Timer";
import Dropdownmenu from "./components/Dropdownenu";

// Constants
// const IP = '192.168.0.100';
const IP = '192.168.1.9';

// Css
import './main.css';
import Switcher from "./components/Switcher";

// Connections
// const ws = new WebSocket(`ws://${IP}:3001/`);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ipAddress: '',
      songs: [],
      currentChosenText: [],
      songId: '',
      currentChosenTextLine: '',

      allowEditText: false,

      allowAddNewSong: false, // Add new song to Db

      books: [],
      chapters: [],
      verses: [],

      currentBookId: '',
      currentChapterId: '',
      currentVerseText: '',

      category: 'songs',

      actionFrameName: 'Название песни',
      actionFrameText: '<p>Пиши текст песни здесь</p>',
      openActionFrame: false,

      name: '', // Name of song or book,

      html: '<p>Пиши текст песни здесь</p>' // Text of song in html
    };
    this.openTextOfThisSong = this.openTextOfThisSong.bind(this);
    this.sendSelectedTextOnAllScreens = this.sendSelectedTextOnAllScreens.bind(this);
    this.takeValueOfSelect = this.takeValueOfSelect.bind(this);
    this.changeName = this.changeName.bind(this);
    this.handleEditedText = this.handleEditedText.bind(this);
    this.actionEditText = this.actionEditText.bind(this);
    this.actionSaveText = this.actionSaveText.bind(this);

    // Methods for work with bible
    this.getChapters = this.getChapters.bind(this);
    this.getVersesOfChosenChapter = this.getVersesOfChosenChapter.bind(this);

    // Methods for work with songs
    this.addSongToDb = this.addSongToDb.bind(this);

    // Frame
    this.actionFrameCancel = this.actionFrameCancel.bind(this);
  }

  componentDidMount() {

    // Get config
    fetch(`http://${IP}:3001/config`, {mode: 'cors'})
      .then((config) => config.json())
      .then(
        (config) => {
          // console.log(books[0].books);
          console.log(config.ip);
          this.setState({
            ipAddress: config.ip
          });
        }
      );

    // Get songs
    fetch(`http://${IP}:3001/songs`, {mode: 'cors'})
      .then((songs) => songs.json())
      .then(
        (songs) => {
          // console.log(books[0].books);
          this.setState({
            songs: songs
          });
        }
      );

    // Get books
    fetch(`http://${IP}:3001/books`, {mode: 'cors'})
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
    const text = this.state.songs.filter((song) => song.id === id)[0].text.split('\n');

    let formattedText = [];

    for (let i = 0; i < text.length; i++) {
      if (text[i] !== '') {
        formattedText.push(text[i]);
      }
    }

    let html = '';

    for (let i = 0; i < text.length; i++) {
      if (text[i] !== '' && text[i] !== ',') {
        html += '<p>' + text[i] + '</p>';
      }
    }

    // console.log(formattedText);

    this.setState({
      name: this.state.songs.filter((song) => song.id === id)[0].name,
      currentChosenText: formattedText,
      html: html,
      songId: id
    });
  }

  sendSelectedTextOnAllScreens(currentChosenTextLine) {

    const ws = new WebSocket(`ws://${IP}:3001/`);

    this.setState({currentChosenTextLine: currentChosenTextLine});

    ws.onopen = () => {
      ws.send(JSON.stringify({
        currentChosenTextLine: this.state.currentChosenTextLine
      }));
    };
  }

  // Return value of from select component
  takeValueOfSelect(value) {
    // console.log(value);
    const category = value === 'Песни' ? 'songs' : 'bible';
    this.setState({category: category});
  }

  // Change name of song
  changeName(e) {
    this.setState({name: e.target.value});
  }

  // Save edited text to Database
  handleEditedText(e) {
    console.log(e.target.value.replace(/,/g, ''));
    this.setState({html: e.target.value.replace(/,/g, '')});
  }

  // Allow to edit text
  actionEditText() {
    // this.setState({allowEditText: true});
    this.setState({openActionFrame: true});
  }

  actionSaveText() {
    this.setState({allowEditText: false});

    const id = this.state.songId;
    const regex = /\<p>|\<\/p\>\<p>|\<\/p>/gi;

    const text = this.state.html.replace(regex, '\n').substr(1);

    let textReturnToObject = this.state.songs.filter((song) => song.id === id)[0].text.split('\n');

    function clear(arr, value) {

      return arr.filter(function (ele) {
        return ele !== value;
      });

    }

    const newtext = clear(textReturnToObject, "");


    axios.post(`http://${IP}:3001/text`, {
      id: id,
      text: text
    })
      .then(function (reply) {
        console.log('reply', reply.data);
        if (reply.data.success) {
          this.setState({currentChosenText: newtext});
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Add new song to Db
  addSongToDb() {
    axios.post(`http://${IP}:3001/add`, {
      name: 'New Songs',
      text: 'Something text bla....'
    })
      .then(function (reply) {
        console.log(reply.data);
        // if (reply.data.success) {
        //   this.setState({currentChosenText: newtext});
        // }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Get chapters
  getChapters(book_number) {

    this.setState({currentBookId: book_number});

    // Get books
    fetch(`http://${IP}:3001/chapters?book=${book_number}`, {mode: 'cors'})
      .then((chapters) => chapters.json())
      .then(
        (chapters) => {
          // console.log(chapters);
          this.setState({
            chapters: chapters
          });
        }
      );
  }

  // Get verses
  getVersesOfChosenChapter(chapter) {
    this.setState({currentChapterId: chapter});
    // Get verses

    axios.get(`http://${IP}:3001/verses?book=${this.state.currentBookId}&chapter=${chapter}`)
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

  // Enter the name in frame window
  actionFrameEnterName(e) {
    this.setState({actionFrameName: e.target.value})
  }

  // Enter the text in frame window
  actionFrameEnterText(e) {

  }

  // Cancel action from frame
  actionFrameCancel() {
    this.setState({openActionFrame: false})
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
        },
        {
          id: 2,
          name: 'Текс'
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
          name: 'Песня'
        },
        {
          id: 1,
          name: 'Библия'
        }
      ],
    };

    const songs =
      this.state.songs !== undefined
        ?
        this.state.songs.map((song) => {
          return <p key={song.id} onClick={() => this.openTextOfThisSong(song.id)}>{song.name}</p>
        })
        :
        '';

    const books =
      this.state.books !== undefined
        ?
        this.state.books.map((book) => {
          return <p key={book.book_number} onClick={() => this.getChapters(book.book_number)}>{book.long_name}</p>
        })
        :
        '';

    return (
      <React.Fragment>

        <div id="hide-background" style={{"display": this.state.openActionFrame ? "flex" : "none"}}></div>

        <div className="column-one">
          <div className="column-one-up">
            <input type="text" id="input-find" placeholder="Поиск"/>
            <Dropdownmenu take={this.takeValueOfSelect} options={options.category}/>
          </div>
          <div className="column-one-center">
            <div id="tracks" className="tracks">
              {this.state.category !== undefined && this.state.category === 'songs' ? songs : books}
            </div>
            <div className="favorites">
              <p className="selected-music">1. Я знаю кто я в тебе</p>
              <p>2. Славь душа Господа</p>
            </div>
          </div>
          <div className="column-one-down">
            <button id="action-button-add" onClick={this.addSongToDb} title='Добавить'>
              <span id="action-button-add-icon"/>
            </button>
            <button id="action-button-favorite" title='Избранное'>
              <span id="action-button-favorite-icon"/>
            </button>

            {
              this.state.allowEditText
                ?
                <button id="action-button-edit" onClick={this.actionSaveText} title='Сохранить'>
                  <span id="action-button-edit-icon"/>
                </button>
                :
                <button id="action-button-edit" onClick={this.actionEditText} title='Редактировать'>
                  <span id="action-button-edit-icon"/>
                </button>
            }
            <button id="action-button-remove" title='Удалить'>
              <span id="action-button-remove-icon"/>
            </button>

          </div>
        </div>
        <div className="column-two">
          <div className="column-two-up">
            {
              this.state.category === 'songs'
                ?
                <input type="text" id="input-music-name" onChange={this.changeName} value={this.state.name}
                       placeholder="Назване выбраной песни"/>
                :
                <Dropdownmenu take={this.getVersesOfChosenChapter} options={this.state.chapters}/>
            }
          </div>
          <div className="column-two-center">
            {
              this.state.allowEditText
                ?
                <ContentEditable
                  id='textarea-music-text'
                  html={this.state.html}
                  disabled={false}
                  onChange={this.handleEditedText}
                />
                :
                <div id="textarea-music-text">
                  <Switcher>
                    {
                      this.state.category === 'songs'
                        ?
                        this.state.currentChosenText !== undefined && this.state.currentChosenText !== null
                          ?
                          this.state.currentChosenText.map((currentChosenTextLine, index) => {
                            return <p key={index}
                                      onClick={() => this.sendSelectedTextOnAllScreens(currentChosenTextLine)}>{currentChosenTextLine}</p>
                          })
                          :
                          <p>Выберите песню</p>

                        :
                        this.state.verses !== undefined && this.state.verses !== null
                          ?
                          this.state.verses.map((verse, index) => {
                            return <p key={index}>{verse.verse}. {verse.text}</p>
                          })
                          :
                          <p>Выберите книгу</p>
                    }
                  </Switcher>
                </div>
            }
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
              <Dropdownmenu options={options.views}/>
            </div>
          </div>
          <div className="column-three-center">
            <div className="screen">
              <p id="screen-text">{this.state.currentChosenTextLine !== '' ? this.state.currentChosenTextLine : ''}</p>
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
            <input type="text" id="input-enter-name" onChange={this.actionFrameEnterName} value={this.state.actionFrameName} placeholder="Название"/>
            {/*<textarea type="text" id="input-enter-text" placeholder="Поиск"/>*/}
            <ContentEditable
              id='textarea-input-text'
              html={this.state.actionFrameText}
              disabled={false}
              onChange={this.actionFrameEnterText}
            />
            <div className="action-frame-controls">
              <button id="action-frame-false" onClick={this.actionFrameCancel}>Отмена</button>
              <button id="action-frame-true">Сохранить</button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));