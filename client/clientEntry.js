import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'isomorph/store';
import Root from 'isomorph/containers/Root';

require('./styles/index.less');

const store = configureStore(window.globalStore);

hydrate(
  <Provider key="provider" store={store}>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </Provider>,
  document.getElementById('react-view')
);
