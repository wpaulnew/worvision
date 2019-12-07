import React, {Component} from 'react';

import './Remote.css';

class Remote extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false,
      book: null,
      chapter_id: null,
      verse_id: null,
      text: null
    };

  }

  componentDidMount() {
    const ws = new WebSocket(`ws://${location.host}/`);
    // console.log(ws);
    ws.onmessage = function (event) {

      const response = JSON.parse(event.data);

      console.log(response);

      // const book = response.id;
      // const chapter_id = response.chapterID;
      // const verse_id = response.id;
      // const text = response.text;

      // if (response.category === 'Библия') {
      this.setState({
        active: true,
        book: response.book,
        chapter_id: response.chapterId,
        verse_id: response.id,
        text: response.text
      });
      // }

    }.bind(this);
  }

  render() {
    return (
      <div className='remote-verses' onClick={() => this.setState({active: !this.state.active})}>
        <p className='remote-verse' style={{'display': this.state.active ? '' : 'none'}}>
          <span className='remote-verse-text' dangerouslySetInnerHTML={{__html: this.state.text}}></span>
          <span
            className='remote-verse-reference'>{this.state.book} {this.state.chapter_id + ':' + this.state.verse_id}</span>
        </p>
      </div>
    );
  }
}

export default Remote;