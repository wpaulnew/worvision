import React, {Component} from 'react';
import TracksRedactor from "../TracksRedactor/TracksRedactor";

import './TracksRedactorContainer.css';

class TracksRedactorContainer extends Component {
  render() {
    // Текст трансформируеться в json

    const couplets = [
      {
        id: 1,
        text: ['Бог мир так возлюбил']
      },
      {
        id: 2,
        text: ['Сына Он', 'за нас отдал']
      },
      {
        id: 3,
        text: ['Кто поверит в', 'Него не погибнет']
      },
      {
        id: 4,
        text: ['Обретет жизнь навсегда']
      },
      {
        id: 5,
        text: ['Обретет жизнь навсегда']
      },
      {
        id: 6,
        text: ['Я держусь лишь креста']
      },
      {
        id: 7,
        text: ['Бога я', 'держусь всегда!']
      }
    ];

    return (
      <div className='tracks-redactor-container'>
        <TracksRedactor couplets={couplets} />
      </div>
    );
  }
}

export default TracksRedactorContainer;