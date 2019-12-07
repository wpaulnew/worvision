import React, {Component} from 'react';
import {loadBooks, loadChapters, loadChapterVerses} from "../../store/actions/reducer-actions";
import {connect} from "react-redux";

class Books extends Component {

  constructor(props) {
    super(props);
    this.loadChapters = this.loadChapters.bind(this);
  }

  componentDidMount() {
    this.props.loadBooks();
  }

  loadChapters(id, name) {
    this.props.loadChapters(id, name);
    this.props.loadChapterVerses(id, 1);
  }

  render() {

    const list = this.props.list !== []
      ?
      this.props.list.map((book) => {
        return <p key={book.id} onClick={() => this.loadChapters(book.id, book.name)}>{book.name}</p>
      })
      :
      '';

    return (
      <div id="names" className="names">
        {list}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    list: state.store.books.list
  }
};

const mapActionsToProps = (dispatch, props) => {
  // console.log('bindActionCreators', props);
  return {
    loadBooks: () => {
      dispatch(loadBooks())
    },
    loadChapters: (bookId, bookName) => {
      dispatch(loadChapters(bookId, bookName))
    },
    loadChapterVerses: (bookId, chapter) => {
      dispatch(loadChapterVerses(bookId, chapter))
    }
  }
};

export default connect(mapStateToProps, mapActionsToProps)(Books);