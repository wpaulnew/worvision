import React, {Component} from 'react';

import './Screen.css';

import html2canvas from 'html2canvas';
import axios from "axios";

class Screen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showBible: false,
      showTrack: false,
      data: {}
    }
  }

  componentDidMount() {

    fetch(`http://${location.host}/current`, {mode: 'cors'})
      .then((data) => data.json())
      .then((data) => {
        const response = JSON.parse(data.data);

        if (response.category === 'bible') {
          this.setState({
            showBible: true,
            data: response.data
          });
        }

        if (response.category === 'tracks') {
          this.setState({
            showTrack: true,
            data: response.data
          });
        }

      });

    const ws = new WebSocket(`ws://192.168.0.100:3001/`);
    // console.log(ws);
    ws.onmessage = function (event) {
      // console.log(event.data);
      const response = JSON.parse(event.data);

      if (response.category === 'bible') {
        this.setState({
          showBible: true,
          showTrack: false,
          data: response.data
        });
      }

      if (response.category === 'tracks') {
        this.setState({
          showTrack: true,
          showBible: false,
          data: response.data
        });
      }

      // // SEND CANVAS ON SERVER
      // setTimeout(() => {
      //
      //   var href = this.state.data.canvas;
      //
      //   html2canvas(document.body).then(function (canvas) {
      //     // document.body.appendChild(canvas);
      //     const imgBase64 = canvas.toDataURL();
      //     console.log(imgBase64);
      //     // Дальше сделать что бы имя файла было это id песни..
      //     axios.post(`http://${location.host}/upload`, {
      //       imgBase64: imgBase64,
      //       fileName: href
      //     })
      //       .then(function (reply) {
      //         console.log(reply);
      //       })
      //       .catch(function (error) {
      //         console.log(error);
      //       });
      //   });
      // }, 100);
      // // /SEND CANVAS ON SERVER

    }.bind(this);

  }

  render() {
    return (
      <div className="view">

        {
          this.state.showBible
            ?
            <div className="screen-bible-container">
              <p id="screen-bible-reference">{this.state.data.book} {this.state.data.chapter}:{this.state.data.id}</p>
              <p id="screen-bible-text">{this.state.data.text}</p>
            </div>
            : ''
        }

        {
          this.state.showTrack
            ?
            <div id="screen-track">
              <p id="screen-track-text">{this.state.data.text}</p>
            </div>
            : ''
        }
      </div>
    );
  }
}

export default Screen;