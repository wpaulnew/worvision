import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Couplet.css';

class Couplet extends Component {
  render() {
    return (
      <div className='couplet'>
        <span className="couplet-text" dangerouslySetInnerHTML={{__html: this.props.text}}/>
      </div>
    );
  }
}

Couplet.propTypes = {
  text: PropTypes.string.isRequired
};

export default Couplet;