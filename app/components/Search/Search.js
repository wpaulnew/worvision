import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Search.css';

class Search extends Component {
  render() {
    return (
      <div className='search'>
        <input type="text" className='search-input' placeholder='Поиск'/>
        <span className='search-total-quantity'>{this.props.total_quantity}</span>
      </div>
    );
  }
}

Search.propTypes = {
  total_quantity: PropTypes.string.isRequired,
};

export default Search;