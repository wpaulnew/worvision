import React, { Component } from 'react';

import './IDropdownenu.css';

class IDropdownenu extends Component {
  constructor() {
    super();

    this.state = {
      active: false,
    };

    this.active = this.active.bind(this);
    this.value = this.value.bind(this);
  }

  active(event) {
    event.preventDefault();

    this.setState({
      active: !this.state.active,
    });
  }

  value(value) {
    console.log(value);
    this.setState({active: false});
  }

  render() {
    return (
      <div className='idropdownenu'>
        <button onClick={this.active} className='idropdownenu-action-button'>{this.state.active === false ? '1': '⋀'}</button>

        {
          this.state.active
            ? (
              <div className="idropdownenu-menu">
                <p onClick={()=>this.value(1)}>1</p>
                <p onClick={()=>this.value(2)}>2</p>
                <p onClick={()=>this.value(3)}>3</p>
              </div>
            )
            : (
              null
            )
        }
      </div>
    );
  }
}

export default IDropdownenu;