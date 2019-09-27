import React, {Component} from 'react';

import './Dropdowmenu.css';

class Dropdowmenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      values: [],
      value: '',
      name: 'value'
    };

    this.active = this.active.bind(this);
    this.value = this.value.bind(this);
  }

  componentDidMount() {

    /*
     name -- this is name of first element in array
    {
      id: 0,
      name: 'normal' // <-- name = name
    }
    {
      id: 0,
      value: 'normal' // <-- name = value
    }
    */

    const name = this.props.name;
    const values = this.props.values;
    const value = this.props.values[0][this.props.name];

    // console.log(name, values, value);

    if (value !== '') {
      this.setState({
        value: value,
        values: values,
        name: name
      });
    }

    // const values = [
    //   {
    //     id: 0,
    //     value: "1"
    //   },
    //   {
    //     id: 1,
    //     value: "2"
    //   },
    //   {
    //     id: 2,
    //     value: "3"
    //   },
    //   {
    //     id: 3,
    //     value: "4"
    //   }
    // ];
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    // console.log(nextProps, nextState);
    if (nextProps.values !== this.state.values) {
      this.setState({
        values: nextProps.values,
        value: nextProps.values[0][nextProps.name],
        active: nextProps.active
      });
    }
  }

  componentDidUpdate(prevProps) {
    // console.log('componentDidUpdate', prevProps);
    // if (prevProps.name !== this.state.name) {
    //   this.setState({
    //     value: prevProps.values[0][this.state.name]
    //   });
    // }
  }

  active(event) {
    event.preventDefault();

    if (this.props.click) {
      this.props.click(!this.state.active);
    }

    this.setState({
      active: !this.state.active,
    });
  }

  value(value) {
    // console.log(value);
    this.setState({
      active: false,
      value: value
    });

    if (this.props.value) {
      this.props.value(value);
    }
  }

  render() {

    const p = this.state.values !== undefined
      ?
      this.state.values.map((value, index) => {
        // console.log(value);
        return <p key={index} onClick={() => {
          this.value(value[this.state.name])
        }}>{value[this.state.name]}</p>
      })
      : null;

      const show = this.props.show !== false ? true : false;

    return (
      <div className='idropdownenu'>

        <button onClick={this.active} className='idropdownenu-action-button' style={this.state.active === true ? {'backgroundColor': '#FFFFFF'} : {}}>
          <span className='action-select-category-value'>{this.state.value !== '' ? this.state.value : ''}</span>
          <span className={this.state.active ? `action-select-category-icon-rotate` : `action-select-category-icon`}/>
        </button>

        <div className="idropdownenu-menu">
          {
            this.state.active
              ?
              show
                ?
                  p
                :''
              : ''
          }
        </div>

      </div>
    );
  }
}

export default Dropdowmenu;