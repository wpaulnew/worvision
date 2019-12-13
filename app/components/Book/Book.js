import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Book.css';

class Book extends Component {
  render() {
    return (
      <div className='book'>
        <span className='book-name'>{this.props.name}</span>
        <span className='book-count-chapters'>{this.props.count_chapters}</span>
      </div>
    );
  }
}

Book.propTypes = {
  name: PropTypes.string.isRequired,
  count_chapters: PropTypes.number.isRequired
};

export default Book;