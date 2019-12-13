import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Verse from "../Verse/Verse";

import './Preview.css';
import Couplet from "../Couplet/Couplet";

class Preview extends Component {
  render() {
    return (
      <div className='preview'>
        {/*<Verse*/}
        {/*  text={'Он пришел к Иисусу ночью и сказал Ему: Равви́! мы знаем, что Ты — учитель, пришедший от Бога; ибо таких чудес, какие Ты творишь, никто не может творить, если не будет с ним Бог.'}*/}
        {/*  reference={'Иоанна 3:2'}*/}
        {/*/>*/}
        <Couplet
          text='Бог мир так возлюбил'
        />
      </div>
    );
  }
}

Preview.propTypes = {};

export default Preview;