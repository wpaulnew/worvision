import React, {Component} from 'react';
import {loadBooks, loadChapters} from "../../store/actions/reducer-actions";
import {connect} from "react-redux";

class Books extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.loadBooks();
  }

  render() {

    const names = this.props.names !== []
      ?
      this.props.names.map((book, index) => {
        return <p key={index} onClick={() => this.props.loadChapters(book.book_number, book.long_name)}>{book.long_name}</p>
      })
      :
      '';

    return (
      <div id="names" className="names">
        {names}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    names: state.store.names
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
    }
  }
};

export default connect(mapStateToProps, mapActionsToProps)(Books);