import React, {Component} from 'react';
import './Tab.css';

class Tab extends Component {

  constructor(props) {
    super(props);
    this.click = this.click.bind(this);
  }


  click() {
    this.props.setActive(this.props.id);
    this.props.activeTabContent(this.props.children);
    if (this.props.click) {
      this.props.click();
    }
  }

  componentDidMount() {
    if (this.props.active) {
      this.props.activeTabContent(this.props.children);
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps !== this.props) {
  //     return true;
  //   }
  // }
  //
  // componentWillUpdate(nextProps, nextState) {
  //   console.log(nextProps);
  //   this.props.activeTabContent(this.props.children);
  // }

  render() {
    return (
      <React.Fragment>
        <button key={this.props.id} className={`tab ${this.props.active ? 'active-tab' : ''}`} onClick={this.click}>{this.props.name}</button>
      </React.Fragment>
    );
  }
}

export default Tab;