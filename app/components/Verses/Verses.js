import React, {Component} from 'react';
import {connect} from "react-redux";

import './Verses.css';
import {updateCurrentVerse} from "../../store/actions/reducer-actions";
import Verse from "./Verse";

class Verses extends Component {
  constructor(props) {
    super(props);

    this.switcher = this.switcher.bind(this);
    this.verses = React.createRef();
  }

  componentWillMount() {
    document.body.addEventListener('keydown',  this.switcher);
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.switcher)
  }

  switcher (e) {
    let count;
    this.verses.current.children ?
      count = Math.floor(this.verses.current.clientWidth / this.verses.current.children[0].clientWidth) : '';

    if (e.code === 'ArrowUp') {
      this.verses.current.children[this.props.verse_id - count - 1] ?
        this.verses.current.children[this.props.verse_id - count - 1].click() : '';
    } else if (e.code === 'ArrowDown') {
      this.verses.current.children[this.props.verse_id + count - 1] ?
        this.verses.current.children[this.props.verse_id + count - 1].click() : '';
    } else if (e.code === 'ArrowRight' || e.code === 'Space') {
      e.code === 'Space' ? e.preventDefault() : '';
      this.verses.current.children[this.props.verse_id] ?
        this.verses.current.children[this.props.verse_id].click() : '';
    } else if (e.code === 'ArrowLeft') {
      this.verses.current.children[this.props.verse_id - 2] ?
        this.verses.current.children[this.props.verse_id - 2].click() : '';
    }
  }

  render() {
    return (
      <div className='verses' ref={this.verses}>
        {
          //Сделать что бы verse был одним компонентом как для слов песни и для стиха
          this.props.verses.map((verse) => {
            return (
             <Verse
               key={verse.verse}
               data={{
                 book: this.props.book,
                 chapter_id: this.props.chapter_id,
                 verse: verse.verse,
                 text: verse.text
               }}
             />
            )
          })
        }
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    chapter_id: state.store.books.book.chapters.chapter.id,
    verses: state.store.books.book.chapters.chapter.verses.list,
    verse_id: state.store.books.book.chapters.chapter.verses.verse.id,
    book: state.store.books.book.name
  }
};

export default connect(mapStateToProps)(Verses);