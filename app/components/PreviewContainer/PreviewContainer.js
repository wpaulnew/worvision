import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Preview from "../Preview/Preview";

class PreviewContainer extends Component {
  render() {
    return (
      <div className='preview-container'>
        <Preview/>
      </div>
    );
  }
}

PreviewContainer.propTypes = {};

export default PreviewContainer;