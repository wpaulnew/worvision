import React, {Component} from 'react';
import {connect} from "react-redux";
import {updateCurrentVerse} from "../../store/actions/reducer-actions";
import './Verse.css';

class Verse extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      id: this.props.data.verse
    });
    this.clear = this.clear.bind(this);
  }

  clear(text) {
    return text.replace(/\{.*\}/g, '')
      .replace(/\(\*.*\)/g, '')
      .replace(/<i>|<\/i>/g, '')
      .replace(/<J>|<\/J>/g, '')
      .replace('*', '')
      .replace('-', '—')
  }

  render() {
    let data = this.props.data;
    return (
      <p className={`verse ${this.props.verse_id ? this.state.id === this.props.verse_id ? 'active-slide': '' : ''}`}
         onClick={() => this.props.updateCurrentVerse(data.verse, data.text, data.book, data.chapter_id)}>
        <span className='verse-text'>{this.clear(data.text)}</span>
        <span className='verse-reference'>{data.book ? data.book : ''} {data.chapter_id ? data.chapter_id : ''}:{}{data.verse}</span>
      </p>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    verse_id: state.store.books.book.chapters.chapter.verses.verse.id
  }
};

const mapActionsToProps = (dispatch) => {
  return {
    updateCurrentVerse: (id, text, book, chapterId ) => {
      dispatch(updateCurrentVerse(id, text, book, chapterId))
    }
  }
};

export default connect(mapStateToProps, mapActionsToProps)(Verse);