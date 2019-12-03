import React, {Component} from 'react';

import './Screen.css';

class Screen extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {}

  render() {
    return (
      <div className="view-container">
        <div className="view">
          <div className="bible-container">
            <div className="bible">
              <div className="bible-text">
                При уверенности и надежде моей, что я ни в чем посрамлен не буду, но при всяком дерзновении и ныне, как и всегда, возвеличится Христос в теле моем, жизнью ли то, или смертью.
              </div>
              <div className="bible-reference">
                Филиппийцам 1:17
              </div>
            </div>
          </div>
          {/*<div className="track-container">*/}
          {/*  <div className="track">*/}

          {/*  </div>*/}
          {/*</div>*/}
        </div>
      </div>
    );
  }
}

export default Screen;