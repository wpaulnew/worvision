import React, {Component} from 'react';
import Draggable from "react-draggable";
import axios from "axios";

import './Editor.css';
import {Resizable} from "re-resizable";

class Editor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loaded: false,

      x: 0,
      y: 0,

      width: 100,
      height: 70
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
          loaded: true,

          x: config.x,
          y: config.y,

          draggableX: config.x,
          draggableY: config.y,

          width: config.width,
          height: config.height
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

    console.log('X: ' + data.lastX, 'Y: ' + data.lastY);

    // Send changes to database
    axios.put(`http://${location.host}/view`, {
      x: this.state.x + data.lastX,
      y: this.state.y + data.lastY,
      width: this.state.width,
      height: this.state.height
    })
      .then(function (response) {

        var config = JSON.parse(response.data).config;
        // // console.log(config);
        this.setState({
          x: config.x,
          y: config.y,
          width: config.width,
          height: config.height
        });

      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });

  }

  render() {


    const resizableStyle =
      this.state.x !== '' && this.state.y !== ''
        ?
        {transform: `translate(${this.state.x}px, ${this.state.y}px)`}
        :
        '';

    const elements = this.state.loaded
      ?
      <Resizable
        grid={[10, 10]}
        style={resizableStyle}
        size={{width: this.state.width, height: this.state.height}}
        onResizeStop={(e, direction, ref, d) => {
          this.setState({
            width: this.state.width + d.width,
            height: this.state.height + d.height,
          });
        }}
      >
        <Draggable
          axis="both"
          handle=".handle"
          position={this.state.x !== '' && this.state.x !== '' ? {x: 0, y: 0} : {}}
          grid={[10, 10]}
          scale={1}
          onStart={this.handleStart}
          onDrag={this.handleDrag}
          onStop={this.handleStop}>

          <div className='handle' id='editor-frame-element-box'
               style={{
                 transform: `translate(${this.state.y}px, ${this.state.x}px)`,
                 width: this.state.width,
                 height: this.state.height
               }}>
            <p>Text</p>
          </div>

        </Draggable>
      </Resizable>
      :
      'loading';


    return (
      <div className="editor-frame-container">
        <div className="editor-frame">

          <div className='editor-frame-place'>
            {elements}
          </div>

          <div className='editor-frame-tools'>
            <button>-</button>
            <button>+</button>
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