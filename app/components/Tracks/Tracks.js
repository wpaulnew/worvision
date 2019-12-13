import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Track from "../Track/Track";

import './Tracks.css';

class Tracks extends Component {
  render() {
    return (
      <div className='tracks'>
        {
          this.props.tracks.map(({id, name, favorite}) => {
            return (
              <Track
                key={id}
                id={id}
                name={name}
                favorite={favorite}
              />
            )
          })
        }
      </div>
    );
  }
}

Tracks.propTypes = {};

export default Tracks;