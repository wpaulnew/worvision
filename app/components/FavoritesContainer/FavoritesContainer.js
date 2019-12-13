import React, {Component} from 'react';
import Tracks from "../Tracks/Tracks";

class FavoritesContainer extends Component {
  render() {

    const tracks = [
      {
        id: 2,
        name: 'Славь душа Господа',
        favorite: true
      },
      {
        id: 8,
        name: 'Я сдаюсь, Бог',
        favorite: true
      }
    ];

    return (
      <div className='favorites-container'>
        <Tracks tracks={tracks}/>
      </div>
    );
  }
}

export default FavoritesContainer;