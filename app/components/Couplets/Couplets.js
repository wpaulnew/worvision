import React, {Component} from 'react';
import {connect} from "react-redux";

import './Verses.css';

class Couplets extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='verses'>
        {
          //Сделать что бы verse был одним компонентом как для слов песни и для стиха
          this.props.verses.map((verse) => {
            return (
              <p key={verse.verse} className='verse'>
                <span className='verse-text'>{this.clear(verse.text)}</span>
                <span className='verse-reference'>{this.props.name ? this.props.name : ''} {this.props.id ? this.props.id : ''}:{}{verse.verse}</span>
              </p>
            )
          })
        }
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    verses: state.store.verses,
    name: state.store.book.name,
    id: state.store.book.chapter.id
  }
};

export default connect(mapStateToProps)(Couplets);