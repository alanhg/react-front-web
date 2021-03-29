import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';


class BottomBar extends Component {

  render() {
    return (
      <div>
        <ul>
          <li>
            &copy;
            <FormattedMessage id="copyright" values={{year: new Date().getFullYear()}}/>
          </li>
          <li>
            <FormattedMessage id="terms"/>
          </li>
          <li>
            <FormattedMessage id="privacy"/>
          </li>
          <li>
            <FormattedMessage id="site.map"/>
          </li>
        </ul>
      </div>
    );
  }
}

export default BottomBar;
