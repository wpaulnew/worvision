import React, {Component} from 'react';
import {connect} from "react-redux";

import './Name.css';

class Name extends Component {
  render() {
    return (
      <div className="name">
        {
          this.props.name !== null
            ? <p>{this.props.name}</p>
            : <p>Книга не выбрана</p>
        }
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    name: state.store.name
  }
};

export default connect(mapStateToProps)(Name);