import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Chapter.css';

class Chapter extends Component {
  render() {
    return (
      <span className='chapter'>{this.props.chapter_id}</span>
    );
  }
}

Chapter.propTypes = {
  chapter_id: PropTypes.number.isRequired
};

export default Chapter;