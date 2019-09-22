import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: ''
    };
  }

  tick() {
    const d = new Date();

    const hours = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();

    const time = hours + ' : ' + minutes + ' : ' + (String(seconds).length === 1 ? '0' + seconds : seconds);

    this.setState(state => ({
      time: time
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {

    const d = new Date();
    const time = d.getHours() + ' : ' + d.getMinutes() + ' : ' + (String(d.getSeconds()).length === 1 ? '0' + d.getSeconds() : d.getSeconds());

    return (
      <React.Fragment>
        {this.state.time !== '' ? this.state.time : time}
      </React.Fragment>
    );
  }
}

export default Timer;