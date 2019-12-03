import React, {Component} from 'react';
import {connect} from "react-redux";
import {loadChapterVerses} from "../../store/actions/reducer-actions";
import Chapter from "./Chapter";

import './Chapters.css'

class Chapters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeChapter: 1 // Этого здесь быть не должно все должно быть в сторе
    };

    this.setActive = this.setActive.bind(this);
  }

  setActive(chapter) {
    this.setState({activeChapter: chapter});
    this.props.loadChapterVerses(this.props.id, chapter)
  }

  render() {
    return (
      <div className="chapters">
        {
          this.props.chapters !== []
            ?
            this.props.chapters.map(
              (chapter) => {
                return (
                  <Chapter
                    key={chapter}
                    chapter={chapter}
                    activeChapter={this.state.activeChapter}
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
    id: state.store.book.id,
    chapters: state.store.book.chapters,
  }
};

const mapActionsToProps = (dispatch, props) => {
  // console.log('bindActionCreators', props);
  return {
    loadChapterVerses: (bookId, chapter) => {
      dispatch(loadChapterVerses(bookId, chapter))
    }
  }
};

export default connect(mapStateToProps, mapActionsToProps)(Chapters);