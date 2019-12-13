import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './TracksRedactor.css';

class TracksRedactor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      couplets: []
    };

    this.change = this.change.bind(this);
    this.check = this.check.bind(this);
  }

  componentDidMount() {
    const couplets = [
      {
        id: 1,
        text: ['Бог мир так возлюбил']
      },
      {
        id: 2,
        text: ['Сына Он', 'за нас отдал']
      },
      {
        id: 3,
        text: ['Кто поверит в', 'Него не погибнет']
      },
      {
        id: 4,
        text: ['Обретет жизнь навсегда']
      },
      {
        id: 5,
        text: ['Обретет жизнь навсегда']
      },
      {
        id: 6,
        text: ['Я держусь лишь креста']
      },
      {
        id: 7,
        text: ['Бога я', 'держусь всегда!']
      }
    ];
    this.setState({couplets: couplets});
  }

  change(id, event) {
    const couplets = this.state.couplets;
    let lines = event.target.value.split('\n');
    console.log(lines);
    couplets[id - 1].text = lines;
    this.setState({couplets: couplets});
  }

  // Удаляет 3-ю строку из куплета
  check(id) {
    const couplets = this.state.couplets;
    couplets[id-1].text.splice(2, 1);
    this.setState({couplets: couplets});
  }

  render() {

    return (
      <div className='tracks-redactor'>
        {
          this.state.couplets.map(({id, text}) => {
            let lines = '';
            if (text.length !== 1) {
              for (let i = 0; i < text.length; i++) {
                lines !== '' ? lines += '\n' + text[i] : lines += text[i];
              }
            }

            return (
              <textarea
                onScrollCapture={() => this.check(id)}
                type="text"
                key={id}
                className='tracks-redactor-textarea'
                value={lines !== '' ? lines : text}
                onChange={(e) => this.change(id, e)}
              />
            )
          })
        }
      </div>
    );
  }
}

TracksRedactor.propTypes = {
  couplets: PropTypes.array.isRequired
};

export default TracksRedactor;