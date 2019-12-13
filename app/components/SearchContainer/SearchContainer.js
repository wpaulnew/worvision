import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Search from "../Search/Search";

import './SearchContainer.css';

class SearchContainer extends Component {
  render() {
    return (
      <div className='search-container'>
        <Search total_quantity='66'/>
      </div>
    );
  }
}

SearchContainer.propTypes = {};

export default SearchContainer;