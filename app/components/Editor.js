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
      elements: [],

      // x: 0,
      // y: 0,
      //
      // width: 100,
      // height: 70
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
          elements: config
        });

        // this.setState({
        //   loaded: true,
        //
        //   x: config.x,
        //   y: config.y,
        //
        //   draggableX: config.x,
        //   draggableY: config.y,
        //
        //   width: config.width,
        //   height: config.height
        // });

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

  handleStop(e, data, id) {
    console.log('Event: ', e);
    console.log('Data: ', data);

    // console.log('X: ' + data.lastX, 'Y: ' + data.lastY);

    this.setState({
      elements: this.state.elements.map(e => {
        if (e.id === id) {
          return {
            ...e, props: {
              ...e.props,
              x: e.props.x + data.lastX,
              y: e.props.y + data.lastY
            }
          }
        }
        return e;
      })
    });

    const config = this.state.elements;

    // Send changes to database
    axios.put(`http://${location.host}/view`, {
      config: config
    })
      .then(function (response) {

        console.log(response);

      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });

  }

  render() {

    const elements = this.state.loaded
      ?
      this.state.elements !== undefined
        ?
        this.state.elements.map((element) => {
          return (
            <Resizable
              key={element.id}
              grid={[10, 10]}
              style={{
                backgroundColor: element.props.background,
                position: 'absolute',
                transform: `translate(${element.props.x}px, ${element.props.y}px)`
              }}
              size={{width: element.props.width, height: element.props.height}}
              onResizeStop={(e, direction, ref, d) => {

                // console.log(this.state.elements.filter((e) => e.id === element.id)[0]);

                this.setState({
                  ...elements,
                  elements: this.state.elements.map(e => {
                    if (e.id === element.id) {
                      return {
                        ...e, props: {
                          ...e.props,
                          width: element.props.width + d.width,
                          height: element.props.height + d.height
                        }
                      }
                    }
                    return e;
                  })
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
                onStop={(e, data) => this.handleStop(e, data, element.id)}>

                <div className='handle' id='editor-frame-element-box'
                     style={{
                       transform: `translate(${element.props.x}px, ${element.props.y}px)`,
                       width: element.props.width,
                       height: element.props.height
                     }}>
                  <p style={element.props.font} dangerouslySetInnerHTML={{__html: element.props.text}}/>
                </div>

              </Draggable>
            </Resizable>
          );
        })
        :
        null
      :
      null;


    return (
      <div className="editor-frame-container">
        <div className="editor-frame">

          <div className='editor-frame-place'>
            {elements}
          </div>

          <div className='editor-frame-tools'>
            <div className='editor-frame-tools-fonts'>
              <span id='editor-frame-tools-fonts-min-size'>A-</span>
              <span id='editor-frame-tools-fonts-max-size'>A+</span>
              <span id='editor-frame-tools-fonts-text-align-left'></span>
              <span id='editor-frame-tools-fonts-text-align-center'></span>
              <span id='editor-frame-tools-fonts-text-align-right'></span>
            </div>
            <div className="editor-frame-tools-windows-resize">
              <span id='editor-frame-tools-window-minimize'></span>
              <span id='editor-frame-tools-window-maximize'></span>
            </div>
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