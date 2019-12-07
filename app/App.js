import React, {Component} from 'react';
import md5 from 'md5';

// For redux
import {connect} from "react-redux";

// Components
import Books from "./components/Books/Books";

// Supports library
// import axios from 'axios';

console.log('Location host: ', location.host);

// Css
import './main.css';

import Chapters from "./components/Chapters/Chapters";
import Tracks from "./components/Tracks/Tracks";
import Verses from "./components/Verses/Verses";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // this.props._loadTracks();
    // this.props._loadBooks();
  }

  render() {

    return (
      <React.Fragment>

        <div className="column-one">
          <Books/>
          {/*<Tracks/>*/}
        </div>

        <div className="column-two">
          <div className="column-two-center">
            <Verses/>
          </div>
        </div>

        <div className="column-three">
          <Chapters/>
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