import React, {Component} from 'react';
import {connect} from "react-redux";
import {loadTracks} from "../../store/actions/reducer-actions";

class Tracks extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadTracks()
  }


  render() {

    const names = this.props.names !== []
      ?
      this.props.names.map((track, index) => {
        return <p key={index}>{track.name}</p>
      })
      :
      '';

    return (
      <div id="names" className="names">
        {names}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    names: state.store.names
  }
};

const mapActionsToProps = (dispatch, props) => {
  // console.log('bindActionCreators', props);
  return {
    loadTracks: () => {
      dispatch(loadTracks())
    }
  }
};

export default connect(mapStateToProps, mapActionsToProps)(Tracks);