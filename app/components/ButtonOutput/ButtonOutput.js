import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Button from "../Button/Button";
import START from '../../icons/START.svg';


class ButtonOutput extends Component {

  openRemoteWindow() {

  }

  render() {
    let filters = {
      active: 'invert(31%) sepia(11%) saturate(3980%) hue-rotate(318deg) brightness(135%) contrast(129%)'
    };

    return (
      <Button
        svg={START}
        size={12}
        click={() => this.openRemoteWindow()}
        filters={filters}
      />
    );
  }
}

ButtonOutput.propTypes = {};

export default ButtonOutput;