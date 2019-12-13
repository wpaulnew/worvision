import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "./Chapters.css";
import Book from "../Book/Book";
import Chapter from "../Chapter/Chapter";

class Chapters extends Component {
  render() {
    return (
      <div className='chapters'>
        {
          this.props.chapters.map((chapter_id) => {
            return (
              <Chapter
                key={chapter_id}
                chapter_id={chapter_id}
              />
            )
          })
        }
      </div>
    );
  }
}

Chapters.propTypes = {
  chapters: PropTypes.array.isRequired
};

export default Chapters;