import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AboutActiveBook from "../AboutActiveBook/AboutActiveBook";

import './AboutActiveBookContainer.css';

class AboutActiveBookContainer extends Component {
  render() {
    return (
      <div className='about-active-book-container'>
        <AboutActiveBook
          book_name='Иоанна'
          book_active_chapter_id='3'
          book_active_chapter_verse_id='1'
        />
      </div>
    );
  }
}

AboutActiveBookContainer.propTypes = {};

export default AboutActiveBookContainer;