import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ControlPanel from "../ControlPanel/ControlPanel";

import './ControlPanelContainer.css';

class ControlPanelContainer extends Component {
  render() {
    return (
      <div className='control-panel-container'>
        <ControlPanel/>
      </div>
    );
  }
}

ControlPanelContainer.propTypes = {};

export default ControlPanelContainer;