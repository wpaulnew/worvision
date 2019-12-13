import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Couplets from "../Couplets/Couplets";

class CoupletsContainer extends Component {
  render() {

    const couplets = [
      {
        id: 1,
        text: 'Бог мир так возлюбил <br> Сына Он за нас отдал',
        active: false
      },
      {
        id: 2,
        text: 'Кто поверит в Него <br> Не погибнет',
        active: false
      },
      {
        id: 3,
        text: 'Обретет жизнь навсегда',
        active: false
      },
      {
        id: 4,
        text: 'Я держусь лишь креста',
        active: false
      },
      {
        id: 5,
        text: 'Бога я держусь всегда',
        active: false
      },
      {
        id: 6,
        text: 'Лишь Любовь меня спасла',
        active: false
      }
    ];

    return (
      <div className='couplets-container'>
        <Couplets couplets={couplets}/>
      </div>
    );
  }
}

CoupletsContainer.propTypes = {};

export default CoupletsContainer;