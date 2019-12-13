import React, {Component} from 'react';
import md5 from 'md5';

// For redux
import {connect} from "react-redux";

// Components
import BooksContainer from "./components/BooksContainer/BooksContainer";

// Supports library
// import axios from 'axios';

console.log('Location host: ', location.host);

// Css
import './main.css';

import SearchContainer from "./components/SearchContainer/SearchContainer";
import AboutActiveBookContainer from "./components/AboutActiveBookContainer/AboutActiveBookContainer";
import ChaptersContainer from "./components/ChaptersContainer/ChaptersContainer";
import ControlPanelContainer from "./components/ControlPanelContainer/ControlPanelContainer";
import PreviewContainer from "./components/PreviewContainer/PreviewContainer";
import VersesContainer from "./components/VersesContainer/VersesContainer";
import ToolbarContainer from "./components/ToolbarContainer/ToolbarContainer";
import TracksContainer from "./components/TracksContainer/TracksContainer";
import FavoritesContainer from "./components/FavoritesContainer/FavoritesContainer";
import CoupletsContainer from "./components/CoupletsContainer/CoupletsContainer";
import TracksRedactorContainer from "./components/TracksRedactorContainer/TracksRedactorContainer";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // Проверка какая вкладка открыта
  }

  render() {

    return (
      <React.Fragment>

        <div className="column-one">
          <div className="column-one-up">
            <SearchContainer/>
          </div>
          <div className="column-one-center">
            <BooksContainer/>
            {/*<TracksContainer/>*/}
          </div>
        </div>

        <div className="column-two">
          <div className="column-two-up">
            <AboutActiveBookContainer/>
          </div>
          <div className="column-two-center">
            <PreviewContainer/>
            <ControlPanelContainer/>
            <ChaptersContainer/>
            {/*<FavoritesContainer/>*/}
            {/*<TracksRedactorContainer/>*/}
          </div>
          {/*<div className="column-two-down">*/}
          {/* */}
          {/*</div>*/}
        </div>

        <div className="column-three">

          <div className="column-three-up">
            <ToolbarContainer/>
          </div>

          <div className="column-three-center">
            <VersesContainer/>
            {/*<CoupletsContainer/>*/}
          </div>
        </div>

      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {}
};

const mapActionsToProps = (dispatch, props) => {
  return {}
};

export default connect(mapStateToProps, mapActionsToProps)(App);