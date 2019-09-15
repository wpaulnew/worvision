import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './main.css';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: ''
    };
  }

  tick() {
    const d = new Date();

    const hours = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();

    const time = hours + ' : ' + minutes + ' : ' + (String(seconds).length === 1 ? '0' + seconds : seconds);

    this.setState(state => ({
      time: time
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {

    const d = new Date();
    const time = d.getHours() + ' : ' + d.getMinutes() + ' : ' + (String(d.getSeconds()).length === 1 ? '0' + d.getSeconds() : d.getSeconds());

    return (
      <React.Fragment>
        {this.state.time !== '' ? this.state.time : time}
      </React.Fragment>
    );
  }
}

class Dropdownmenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
    this.handleActive = this.handleActive.bind(this);
  }

  componentDidMount() {
    // console.log(this.props.options);
  }

  handleActive() {
    console.log('fdfdf');
    this.setState({active: !this.state.active})
  }

  render() {
    return (
      <div id='select-action-container'>
        <select id="action-select-category" onClick={this.handleActive}>
          {
            this.props.options.map((option) => {
              return <option key={option.id} value={option.id}>{option.name}</option>
            })
          }
        </select>
        <span id="action-select-category-icon" className='rotate-back'></span>
      </div>
    );
  }
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ip: '',
      songs: [],
      text: [],
      line: ''
    };
    this.openTextOfThisSong = this.openTextOfThisSong.bind(this);
    this.sendSelectedTextOnAllScreens = this.sendSelectedTextOnAllScreens.bind(this);
  }


  componentDidMount() {

    // Get config
    fetch('http://192.168.0.100:3001/config', {mode: 'cors'})
      .then((config) => config.json())
      .then(
        (config) => {
          this.setState({
            ip: config.ip
          });
        }
      );

    // Get songs
    fetch('http://192.168.0.100:3001/songs', {mode: 'cors'})
      .then((songs) => songs.json())
      .then(
        (songs) => {
          // console.log(songs);
          this.setState({
            songs: songs.songs
          });
        }
      );

    const ws = new WebSocket('ws://192.168.0.100:3001/');

    ws.onopen = () => {
      ws.send(JSON.stringify({text: this.state.text}));
    };

    ws.onmessage = function (event) {
      console.log(event);
      console.log('Socket send me: ', event.data);
    };
  }

  handleEvent(event) {
    const ws = new WebSocket('ws://localhost:3001/');

    // this.setState({text: event.target.value});

    ws.onopen = () => {
      ws.send(JSON.stringify({text: this.state.text}));
    };
    ws.onmessage = function (event) {
      console.log(event.data);
    };
  }

  openTextOfThisSong(name) {
    // Get song text by name
    fetch('http://192.168.0.100:3001/song?name=' + name, {mode: 'cors'})
      .then((song) => song.json())
      .then(
        (song) => {
          // console.log(song);
          this.setState({
            text: song.text
          });
        }
      );
  }

  sendSelectedTextOnAllScreens(line) {
    this.setState({line: line});
    const ws = new WebSocket('ws://192.168.0.100:3001/');
    ws.onopen = () => {
      ws.send(JSON.stringify({text: line}));
    };
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

    return (
      <React.Fragment>
        <div className="column-one">
          <div className="column-one-up">
            <input type="text" id="input-find" placeholder="Поиск"/>
            <Dropdownmenu options={options.category}/>
          </div>
          <div className="column-one-center">
            <div id="tracks" className="tracks">
              {
                this.state.songs !== undefined
                  ?
                  this.state.songs.map((song) => {
                    return <p key={song}
                              onClick={() => this.openTextOfThisSong(song.replace('.txt', ''))}>{song.replace('.txt', '')}</p>
                  })
                  :
                  ''
              }
            </div>
            <div className="favorites">
              <p className="selected-music">1. Я знаю кто я в тебе</p>
              <p>2. Славь душа Господа</p>
            </div>
          </div>
          <div className="column-one-down">

            <button id="action-button-add" title='Добавить'>
              <span id="action-button-add-icon"/>
              {/*<span id="action-button-add-text">Добавить</span>*/}
            </button>
            <button id="action-button-favorite" title='Избранное'>
              <span id="action-button-favorite-icon"/>
              {/*<span id="action-button-favorite-text">Избраное</span>*/}
            </button>

            <button id="action-button-edit" title='Редактировать'>
              <span id="action-button-edit-icon"/>
              {/*<span id="action-button-edit-text">Редактировать</span>*/}
            </button>
            <button id="action-button-remove" title='Удалить'>
              <span id="action-button-remove-icon"/>
              {/*<span id="action-button-remove-text">Удалить</span>*/}
            </button>

          </div>
        </div>
        <div className="column-two">
          <div className="column-two-up">
            <input type="text" id="input-music-name" placeholder="Назване выбраной песни"/>
          </div>
          <div className="column-two-center">
            <div id="textarea-music-text">
              {
                this.state.text !== undefined
                  ?
                  this.state.text.map((line, index) => {
                    return <p key={index} onClick={() => this.sendSelectedTextOnAllScreens(line)}>{line}</p>
                  })
                  :
                  ''
              }
            </div>
          </div>
          <div className="column-two-down">
            {/*<button id="action-button-edit">*/}
            {/*  <span id="action-button-edit-icon"/>*/}
            {/*  <span id="action-button-edit-text">Редактировать</span>*/}
            {/*</button>*/}
            {/*<button id="action-button-remove">*/}
            {/*  <span id="action-button-remove-icon"/>*/}
            {/*  <span id="action-button-remove-text">Удалить</span>*/}
            {/*</button>*/}
          </div>
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
              <p id="screen-text">{this.state.line !== '' ? this.state.line : ''}</p>
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
            <span id="ip-address">{this.state.ip !== '' ? this.state.ip : ''}</span>
            <Timer/>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));