import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Clock from "../Clock/Clock";

import './Toolbar.css';
import ADD from "../../icons/ADD.svg";
import EDIT from "../../icons/EDIT.svg";
import Button from "../Button/Button";

class Toolbar extends Component {
  render() {
    return (
      <div className='toolbar'>
        <Button svg={ADD} size={12}/>
        <Button svg={EDIT}/>
        <Clock/>
      </div>
    );
  }
}

Toolbar.propTypes = {};

export default Toolbar;