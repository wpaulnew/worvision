import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './AboutActiveBook.css';

class AboutActiveBook extends Component {
  render() {
    
    return (
      <div className='about-active-book'>
        <span className='about-active-book-name'>{this.props.book_name}</span>
        <span className='about-active-book-chapter-id'>{this.props.book_active_chapter_id}</span>:
        <span className='about-active-book-chapter-verse-id'>{this.props.book_active_chapter_verse_id}</span>
      </div>
    );
  }
}

AboutActiveBook.propTypes = {
  book_name: PropTypes.string.isRequired,
  book_active_chapter_id: PropTypes.string.isRequired,
  book_active_chapter_verse_id: PropTypes.string.isRequired
};

export default AboutActiveBook;