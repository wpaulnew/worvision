import React, {Component} from 'react';
import {connect} from "react-redux";
import {loadChapterVerses} from "../../store/actions/reducer-actions";
import Number from "./Number/Number";

import './Chapters.css'

class Chapters extends Component {
  constructor(props) {
    super(props);

    this.setActive = this.setActive.bind(this);
  }

  setActive(number) {
    this.setState({activeChapter: number});
    this.props.loadChapterVerses(this.props.bookId, number)
  }

  render() {
    return (
      <div className="chapters">
        {
          this.props.numbers !== []
            ?
            this.props.numbers.map(
              (number) => {
                return (
                  <Number
                    key={number}
                    chapter={number}
                    activeChapter={this.props.id ? this.props.id : 1}
                    setActive={this.setActive}
                  />
                )
              }
            )
            : ''
        }
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  //d книги выбраной
  return {
    id: state.store.books.book.chapters.chapter.id,
    numbers: state.store.books.book.chapters.numbers,
    bookId: state.store.books.book.id
  }
};

const mapActionsToProps = (dispatch, props) => {
  return {
    loadChapterVerses: (bookId, number) => {
      dispatch(loadChapterVerses(bookId, number))
    }
  }
};

export default connect(mapStateToProps, mapActionsToProps)(Chapters);