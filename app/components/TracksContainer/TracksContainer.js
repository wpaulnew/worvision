import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './TracksContainer.css';
import Tracks from "../Tracks/Tracks";

class TracksContainer extends Component {
  render() {

    const tracks = [
      {
        id: 1,
        name: 'Бог мир так возлюбил',
        favorite: false
      },
      {
        id: 2,
        name: 'Славь душа Господа',
        favorite: true
      },
      {
        id: 3,
        name: 'Прихожу к тебе я',
        favorite: false
      },
      {
        id: 4,
        name: 'У ног Твоих',
        favorite: false
      },
      {
        id: 5,
        name: 'Я славлю Тебя в шторм',
        favorite: false
      },
      {
        id: 6,
        name: 'Веди меня к ресту',
        favorite: false
      },
      {
        id: 7,
        name: 'Хочу я быть ближе',
        favorite: false
      },
      {
        id: 8,
        name: 'Я сдаюсь, Бог',
        favorite: true
      },
      {
        id: 9,
        name: 'Океаны',
        favorite: false
      },
      {
        id: 10,
        name: 'Бесконечный',
        favorite: false
      },
      {
        id: 11,
        name: 'Светлый День',
        favorite: false
      },
      {
        id: 12,
        name: 'Наш Бог',
        favorite: false
      }
    ];

    return (
      <div className='tracks-container'>
        <Tracks tracks={tracks}/>
      </div>
    );
  }
}

TracksContainer.propTypes = {};

export default TracksContainer;