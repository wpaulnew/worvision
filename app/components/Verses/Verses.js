import React, {Component} from 'react';
import {connect} from "react-redux";

import './Verses.css';

class Verses extends Component {

  constructor(props) {
    super(props);
    this.verses = React.createRef();
  }

  render() {
    return (
      <div className='verses'>
        {
          //Сделать что бы verse был одним компонентом как для слов песни и для стиха
          this.props.verses.map((verse) => {
            return (
              <p key={verse.verse} className='verse'>{verse.verse}. {verse.text}</p>
            )
          })
        }
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    verses: state.store.verses
  }
};

export default connect(mapStateToProps)(Verses);