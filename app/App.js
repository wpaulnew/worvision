import React, {Component} from 'react';
import md5 from 'md5';

// For redux
import {connect} from "react-redux";

// Components
import Tab from "./components/Tabs/Tab/Tab";
import Books from "./components/Books/Books";

// Supports library
// import axios from 'axios';

console.log('Location host: ', location.host);

// Css
import './main.css';

import Tabs from "./components/Tabs/Tabs";
import Chapters from "./components/Chapters/Chapters";
import Tracks from "./components/Tracks/Tracks";
import Name from "./components/Name/Name";
import Verses from "./components/Verses/Verses";

// Icons
// import ARROWLEFT from './icons/ARROWLEFT.svg';
// import ARROWRIGHT from './icons/ARROWRIGHT.svg';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {};

    this.openTextOfThisSong = this.openTextOfThisSong.bind(this);

    this.sendCurrentTrackTextWithSocket = this.sendCurrentTrackTextWithSocket.bind(this); // ws
    this.sendCurrentChapterTextWithSocket = this.sendCurrentChapterTextWithSocket.bind(this); // ws
  }

  componentDidMount() {
    // this.props._loadTracks();
    // this.props._loadBooks();
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", () => {
    }, false);
  }

  // Get song text by id
  openTextOfThisSong(id) {

    // Make this is server api
    const text = this.props._tracks.filter((song) => song.id === id)[0].text.split('\n');

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


    this.setState({
      currentTrackId: id,
      currentTrackName: this.props._tracks.filter((song) => song.id === id)[0].name,
      currentTrackText: currentTrackText,
      actionFrameName: this.props._tracks.filter((song) => song.id === id)[0].name,
      actionFrameText: actionFrameText,
    });
  }

  // WS send track text
  sendCurrentTrackTextWithSocket(currentTrackTextLine) {

    // Set canvas
    var canvas = md5(this.state.currentTrackTextLine);

    const ws = new WebSocket(`ws://${location.host}/`);

    this.setState({currentTrackTextLine: currentTrackTextLine});

    ws.onopen = () => {
      ws.send(JSON.stringify(
        {
          category: this.props._ui.category.name,
          data: {
            canvas: canvas,
            text: this.state.currentTrackTextLine
          }
        }
      ));

      const data = JSON.stringify(
        {
          category: this.props._ui.category.name,
          data: {
            text: this.state.currentTrackTextLine // Что бы не было ошибки на сервере!
          }
        }
      );

      // Update in the Db
      axios.put(`http://${location.host}/current`, {data: data})
        .then(function (reply) {

          // Устанавлеваем канвас после всего
          this.setState({canvas: canvas});

        }.bind(this))
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
          category: this.props._ui.category.name,
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
          category: this.props._ui.category.name,
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
        })
        .catch(function (error) {
          console.log(error);
        });

    };
  }

  render() {

    return (
      <React.Fragment>

        <div className="column-one">

          <Tabs>
            <Tab name="Библия" click={() => console.log('Библия')}>
              <Books/>
            </Tab>
            <Tab name="Песни" click={() => console.log('Список песен')}>
              <Tracks/>
            </Tab>
          </Tabs>

        </div>

        <div className="column-two">
          <div className="column-two-up">
            <Name/>
          </div>
          <div className="column-two-center">
            <Verses/>
          </div>
        </div>

        <div className="column-three">
          <Tabs>
            <Tab name="Главы" click={() => console.log('Главы')}>
              <Chapters/>
            </Tab>
            <Tab name="Моменты" click={() => console.log('История')}>

            </Tab>
          </Tabs>
        </div>

      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {}
};

const mapActionsToProps = (dispatch, props) => {
  return {}
};

export default connect(mapStateToProps, mapActionsToProps)(App);