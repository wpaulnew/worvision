import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      answer: ''
    }
  }

  render() {
    return (
      <div>
        Ты идешь гладить тюль?
        <button onClick={() => this.setState({answer: true})}>Да, конечно</button>
        <button onClick={() => this.setState({answer: false})}>Нет, ни за что</button>
        {
          this.state.answer !== ''
            ?
              this.state.answer === true
              ?
              <h1 style={{'color': 'green'}}>This is good!</h1>
              :
              <h1 style={{'color': 'red'}}>Not good</h1>
            :
              ''
        }

        <button onClick={() => this.setState({answer: ''})}>Сбросить</button>

      </div>
    );
  }
};

ReactDOM.render(<App/>, document.getElementById('app'));