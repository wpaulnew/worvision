import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Couplet from "../Couplet/Couplet";

import './Couplets.css';

class Couplets extends Component {
  render() {
    return (
      <div className='couplets'>
        {
          this.props.couplets.map(({id, text}) => {
            return (
              <Couplet
                key={id}
                text={text}
              />
            )
          })
        }
      </div>
    );
  }
}

Couplets.propTypes = {};

export default Couplets;