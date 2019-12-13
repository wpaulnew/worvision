import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FAVORITE from "../../icons/FAVORITE.svg";
import UNFAVORITE from "../../icons/UNFAVORITE.svg";

import './Track.css';
import Button from "../Button/Button";

class Track extends Component {
  render() {
    return (
      <div className='track'>
        <span className='track-name'>{this.props.name}</span>
        {
          this.props.favorite
            ?
              <div className="track-favorite">
                {/*<img className='track-favorite-icon' src={UNFAVORITE}/>*/}
              </div>
            :
              <div className="track-favorite">
                {/*<img className='track-favorite-icon' src={FAVORITE}/>*/}
              </div>
        }
      </div>
    );
  }
}

Track.propTypes = {};

export default Track;