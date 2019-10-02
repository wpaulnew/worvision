import React, {Component} from 'react';
import axios from "axios";

import './Add.css';

class Add extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      text: ''
    };

    this.name = this.name.bind(this);
    this.text = this.text.bind(this);
    this.add = this.add.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  name(e) {
    this.setState({
      name: e.target.value
    });
  }

  text(e) {
    this.setState({
      text: e.target.value
    });
  }

  add() {
    var name = this.state.name;
    var text = this.state.text;

    const regex = /\<p>|\<\/p\>\<p>|\<\/p>/gi;
    text = this.state.text.replace(regex, '\n');

    axios.post(`http://${location.host}/track`, {
      name: name,
      text: text
    })
      .then(function (reply) {

        // Close window after save
        const {ipcRenderer} = window.require('electron');
        ipcRenderer.send('close-add-window');

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  cancel() {
  // Close window
    const {ipcRenderer} = window.require('electron');
    ipcRenderer.send('close-add-window');
  }

  render() {
    return (
      <div className="add">
        <div className="add-container">
          <input
            type="text"
            id="input-enter-name"
            onChange={this.name}
            value={this.state.name}
            placeholder="Название песни"
          />
          <textarea
            id="textarea-input-text"
            value={this.state.text}
            onChange={this.text}
            placeholder="Текс песни"
          />
          <div className="action-frame-controls">
            <button id="action-frame-false" onClick={this.cancel}>Отмена</button>
            <button id="action-frame-true" onClick={this.add}>Добавить</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Add;