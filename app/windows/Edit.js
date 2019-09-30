import React, {Component} from 'react';
import axios from "axios";

import './Add.css';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      text: ''
    };

    this.name = this.name.bind(this);
    this.text = this.text.bind(this);
    this.save = this.save.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentDidMount() {
    const {ipcRenderer} = window.require('electron');
    ipcRenderer.on('edit-song', (event, data) => {
      const id = JSON.parse(data).currentTrackId;
      // console.log(id);
      axios.get(`http://${location.host}/tracks/${id}`)
        .then((response) => {
          console.log(response);

          var text = '';

          for (let i = 0; i < response.data.track.text.length; i++) {
            if (response.data.track.text[i] !== '' && response.data.track.text[i] !== ',') {
              text += response.data.track.text[i] + '\n';
            }
          }

          this.setState({
            id: response.data.track.id,
            name: response.data.track.name,
            text: text
          });
        })
        .catch(function (error) {
          console.log('Error: Get track information by id');
        });
    });
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

  save() {
    const id = this.state.id;
    const name = this.state.name;
    const text = this.state.text;

    console.log(text);

    // Send changes to database
    axios.put(`http://${location.host}/track`, {
      id: id,
      name: name,
      text: text
    })
      .then(function (reply) {
        // console.log('reply', reply.data);

        // Close window after save
        const {ipcRenderer} = window.require('electron');
        ipcRenderer.send('close-edit-window');

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  cancel() {
    // Close window
    const {ipcRenderer} = window.require('electron');
    ipcRenderer.send('close-edit-window');
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
            <button id="action-frame-true" onClick={this.save}>Сохранить</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;