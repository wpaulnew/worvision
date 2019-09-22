import React from 'react';

class Dropdownmenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false,
      defaultValue: ''
    };
    this.handleActive = this.handleActive.bind(this);
  }

  handleActive() {
    this.setState({active: !this.state.active})
  }

  render() {
    return (
      <div id='select-action-container'>
        <select id="action-select-category" defaultValue={this.state.defaultValue}
                onChange={this.props.take ? (e) => this.props.take(e.target.value) : null}
                onClick={this.handleActive}>
          {
            this.props.options.map((option) => {
              return <option key={option.name} value={option.name}>{option.name}</option>
            })
          }
        </select>
        <span id="action-select-category-icon" className='rotate-back'></span>
      </div>
    );
  }
}

export default Dropdownmenu;