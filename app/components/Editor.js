import React, {Component} from 'react';
import Draggable from "react-draggable";
import axios from "axios";

import './Editor.css';

class Editor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      x: 0,
      y: 0,
      loaded: false
    };

    // Editor
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }

  componentDidMount() {

    axios.get(`http://${location.host}/view`)
      .then(function (response) {
        // handle success
        const config = response.data.config;
        console.log('CONFIG:', config);

        this.setState({
          x: config.x,
          y: config.y,
          loaded: true
        });

      }.bind(this))
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  handleStart(e, data) {
    // console.log('Event: ', e);
    // console.log('Data: ', data);
  }

  handleStop(e, data) {
    console.log('Event: ', e);
    console.log('Data: ', data);

    console.log('X: ' + data.lastX, 'Y: '+ data.lastY);

    // Send changes to database
    axios.put(`http://${location.host}/view`, {
      x: data.lastX,
      y: data.lastY,
    })
      .then(function (response) {

        var config = JSON.parse(response.data).config;
        // console.log(config);
        // this.setState({
        //   x: config.x,
        //   y: config.y
        // });

      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });

  }

  render() {
    return (
      <div className="editor-frame-container">
        <div className="editor-frame">
          <div className='editor-frame-tools'>
            <button>-</button>
            <button>+</button>
          </div>
          <div className='editor-frame-place'>
            {
              this.state.loaded
                ?
                <Draggable
                  axis="both"
                  handle=".handle"
                  defaultPosition={{x: this.state.x, y: this.state.y}}
                  position={null}
                  grid={[10, 10]}
                  scale={1}
                  onStart={this.handleStart}
                  onDrag={this.handleDrag}
                  onStop={this.handleStop}>
                  <div className='handle' id='editor-frame-element-box' style={{'transform':`translate(${this.state.y}px, ${this.state.x}px)`}}>
                    <p>Box text</p>
                  </div>
                </Draggable>
                :
                'loading'
            }
          </div>

          <div className="editor-frame-controls">
            <button id="editor-frame-false">Отмена</button>
            <button id="editor-frame-true">Сохранить</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Editor;