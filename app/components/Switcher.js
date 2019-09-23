import React from 'react';
import './switcher.css';

class Switcher extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.textRef = React.createRef();

    this.state = {
      count: 0,
      allElements: ''
    }
  }

  componentWillMount() {
    document.addEventListener("keydown", this.onKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyPress);
  }

  render() {
    return (
      <React.Fragment>
        <div onClick={this.handleClick} ref={this.textRef}>
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }

  handleClick(e) {
    if (e.target.tagName === "P") {  // || e.target.tagName === "SPAN"
      if (e.target.innerText[0] !== '-') {
        this.setState({
          allElements: this.textRef.current.children
        });

        let allElements = this.textRef.current.children;

        for (let i = 0; i < allElements.length; i++) {
          allElements[i].classList.remove('active');
        }

        if (e.target.tagName === 'P') {
          e.target.classList.add('active');
        }

        for (let i = 0; i < allElements.length; i++) {
          if (allElements[i].className === 'active') {
            this.setState({
              count: i
            });
          }
        }
      }
    }
  };

  onKeyPress(e) {
    let count = this.state.count;
    let allElements = this.state.allElements;
    if (e.key === 'ArrowUp') {
      if (count >= 0) {
        if (count > 0 && allElements[count - 1].innerText[0] !== '-') {
          this.setState({
            count: count - 1
          });
        } else if (count > 1 && allElements[count - 1].innerText[0] === '-') {
          this.setState({
            count: count - 2
          });
          allElements[count - 2].classList.add('active');

          // Add selected text to state
          allElements[count - 2].click();
        }
        if (allElements[count - 1] !== undefined && allElements[count - 1].innerText[0] !== '-') {
          allElements[count - 1].classList.add('active');

          // Add selected text to state
          allElements[count - 1].click();
        }
        if (count > 1 || (allElements[count - 1] !== undefined && allElements[count - 1].innerText[0] !== '-')) {
          allElements[count].classList.remove('active');
        }
      }
    }

    if (e.key === 'ArrowDown') {
      if (count <= allElements.length) {
        if (count + 1 < allElements.length && allElements[count + 1].innerText[0] !== '-') {
          this.setState({
            count: count + 1
          });
        } else if (count + 2 < allElements.length && allElements[count + 1].innerText[0] === '-') {
          this.setState({
            count: count + 2
          });
          allElements[count + 2].classList.add('active');

          // Add selected text to state
          allElements[count + 2].click();
        }
        if (allElements[count + 1] !== undefined && allElements[count + 1].innerText[0] !== '-') {
          allElements[count + 1].classList.add('active');

          // Add selected text to state
          allElements[count + 1].click();
        }
        if (count + 2 < allElements.length || (allElements[count + 1] !== undefined && allElements[count + 1].innerText[0] !== '-')) {
          allElements[count].classList.remove('active');
        }
      }
    }
  }
}

export default Switcher;
