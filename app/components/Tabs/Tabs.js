import React, {Component} from 'react';
import './Tabs.css'

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      content: null
    };

    this.setActive = this.setActive.bind(this);
    this.activeTabContent = this.activeTabContent.bind(this);
  }

  componentDidMount() {
    // let children = React.Children.toArray(this.props.children);
    // children.map((child) => {
    //   // console.log()
    //   child.key === '.0' ? child.props.click() : '';
    // })
  }

  setActive(id) {
    this.setState({activeIndex: id});
  }

  activeTabContent(content) {
    this.setState({content: content})
  }

  render() {

    const children = React.Children.map(this.props.children, (child, index) => {
      // this.setState({content})
      return React.cloneElement(child, {
        id: index,
        name: child.props.name,
        active: index === this.state.activeIndex,
        setActive: (id) => this.setActive(id),
        activeTabContent: (content) => this.activeTabContent(content)
      });
    });

    return (
      <div className="tabs-container">
        <div className='tabs'>{children}</div>
        <div className="tabs-content">
          {this.state.content}
        </div>
      </div>
    );
  }
}

export default Tabs;