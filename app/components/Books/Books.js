import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Book from "../Book/Book";

import './Books.css';

class Books extends Component {

  render() {
    return (
      <div className='books'>
        {
          this.props.books.map(({book_id, book_name, book_count_chapters}) => {
            return (
              <Book
                key={book_id}
                id={book_id}
                name={book_name}
                count_chapters={book_count_chapters}
              />
            )
          })
        }
      </div>
    );
  }
}

Books.propTypes = {
  books: PropTypes.array.isRequired
};

export default Books;