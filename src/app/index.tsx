import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { IntlProvider } from 'react-intl';

import AppComponent from './app';

const rootEl = document.getElementById('root');

const messages = {};

const locale = 'en-us';

const render = component => {
  ReactDOM.render(
    <AppContainer>
      <IntlProvider locale={locale} messages={messages[locale]} ref={ref => (window.intl = ref.state.intl)}>
        {
          component()
        }
      </IntlProvider>
    </AppContainer>,
    rootEl
  );
};

render(AppComponent);
