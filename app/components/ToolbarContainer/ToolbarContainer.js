import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Toolbar from "../Toolbar/Toolbar";

import './ToolbarContainer.css';

class ToolbarContainer extends Component {
  render() {
    return (
      <div className='toolbar-container'>
        <Toolbar/>
      </div>
    );
  }
}

ToolbarContainer.propTypes = {};

export default ToolbarContainer;