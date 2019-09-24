import React from 'react';

class Dropdownmenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false,
      defaultValue: '',
      initialValue: '',
      loaded: false
    };
    this.handleActive = this.handleActive.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInitialValue = this.handleInitialValue.bind(this);
    this.selectRef = React.createRef();
  }

  handleActive() {
    this.setState({active: !this.state.active})
  }

  handleChange(e) {
    this.props.take(e.target.value);
    this.setState({defaultValue: e.target.value});
  }

  handleInitialValue() {
    console.log(this.selectRef);
    console.log('sdfasdfsd');
  }

  render() {
    return (
      <div id='select-action-container'>
        <select
          id="action-select-category"
          value={this.state.defaultValue}
          onChange={this.handleChange}
          onClick={this.handleActive}
        >
          {
            this.props.options.map((option) => {
              return <option key={option.name} value={option.name} >{option.name}</option>
            })
          }
        </select>
        <span id="action-select-category-icon" className='rotate-back'></span>
      </div>
    );
  }
}

export default Dropdownmenu;