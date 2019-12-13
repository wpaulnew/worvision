import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from "../Button/Button";
import INFORMATION from '../../icons/INFORMATION.svg';
import CHANGE from '../../icons/CHANGE.svg';
import LEFT from '../../icons/LEFT.svg';
import HIDDEN from '../../icons/HIDDEN.svg';
import RIGHT from '../../icons/RIGHT.svg';
import SETTINGS from '../../icons/SETTINGS.svg';
import START from '../../icons/START.svg';

import './ControlPanel.css';
import ButtonOutput from "../ButtonOutput/ButtonOutput";

class ControlPanel extends Component {
  render() {
    return (
      <div className='control-panel'>
        <Button
          svg={INFORMATION}
          size={13}
          click={()=>console.log('Активирования')}
          unclick={()=>console.log('Деактивированая')}
        />
        <Button svg={CHANGE} size={16}/>
        <Button svg={LEFT} size={8}/>
        <Button svg={HIDDEN} size={14}/>
        <Button svg={RIGHT} size={8}/>
        <Button svg={SETTINGS} size={12}/>
        <ButtonOutput/>
      </div>
    );
  }
}

ControlPanel.propTypes = {};

export default ControlPanel;