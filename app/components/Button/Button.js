import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Button.css';

class Button extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false
    }
  }

  componentDidMount() {
    // this.setState({active: !this.state.active})
  }

  render() {

    // invert(100%) sepia(100%) saturate(0%) hue-rotate(75deg) brightness(103%) contrast(105%)

    return (
      <button className='button' onClick={() => {
        !this.state.active ? this.props.click() : '';
        this.setState({
          active: !this.state.active
        });
      }}>
        <span
          className='button-icon'
          style={{
            backgroundImage: `url(${this.props.svg})`,
            backgroundSize: this.props.size,
            filter: this.state.active ? this.props.filters.active : 'none'
          }}
        />
      </button>
    );
  }
}

Button.propTypes = {
  svg: PropTypes.string.isRequired
};

export default Button;