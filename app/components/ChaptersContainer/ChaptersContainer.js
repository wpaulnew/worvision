import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Chapters from "../Chapters/Chapters";

import "./ChaptersContainer.css";

class ChaptersContainer extends Component {

  render() {

    const chapters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

    return (
      <div className="chapters-container">
        <Chapters chapters={chapters}/>
      </div>
    );
  }
}

ChaptersContainer.propTypes = {};

export default ChaptersContainer;