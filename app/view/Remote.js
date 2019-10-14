import React, {Component} from 'react';

import './Remote.css';

class Remote extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showBible: false,
      showTrack: false,
      data: {}
    };

    this.clear = this.clear.bind(this);
  }


  componentDidMount() {

    fetch(`http://${location.host}/current`, {mode: 'cors'})
      .then((data) => data.json())
      .then((data) => {
        const response = JSON.parse(data.data);
        console.log(response);

        if (response.category === 'Библия') {
          this.setState({
            showBible: true,
            data: response.data
          });
        }

        if (response.category === 'Песни') {
          this.setState({
            showTrack: true,
            data: response.data
          });
        }

      });

    const ws = new WebSocket(`ws://${location.host}/`);
    // console.log(ws);
    ws.onmessage = function (event) {
      console.log(event.data);
      const response = JSON.parse(event.data);

      if (response.category === 'Библия') {
        this.setState({
          showBible: true,
          showTrack: false,
          data: response.data
        });
      }

      if (response.category === 'Песни') {
        this.setState({
          showTrack: true,
          showBible: false,
          data: response.data
        });
      }

    }.bind(this);
  }

  clear(text) {
    return text.replace(/\{.*\}/g, '')
      .replace(/\(\*.*\)/g, '')
      .replace('*', '')
      .replace('-', '—')
      // .replace(/\"\s/g, '</i> ')
      // .replace(/"/g, '<j>');
  }

  render() {
    return (
      <React.Fragment>
        {
          this.state.showBible
            ?
            <div id="bible">
              <div className="bible-container">
                <p id="bible-reference">{this.state.data.book} {this.state.data.chapter}:{this.state.data.id}</p>
                <p id="bible-text" dangerouslySetInnerHTML={{__html: this.clear(this.state.data.text)}}></p>
              </div>
            </div>

            : ''
        }

        {
          this.state.showTrack
            ?
            <div className="remote-screen">
              <div id="track">
                <p id="track-text">{this.state.data.text}</p>
              </div>
            </div>
            : ''
        }
      </React.Fragment>
    );
  }
}

export default Remote;