import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Verse.css';

class Verse extends Component {
  render() {
    return (
      <div className='verse'>
        <span className='verse-text'>{this.props.text}</span>
        <span className='verse-reference'>{this.props.reference}</span>
      </div>
    );
  }
}

Verse.propTypes = {
  text: PropTypes.string.isRequired,
  reference: PropTypes.string.isRequired
};

export default Verse;