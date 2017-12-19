import React from 'react';
import config from 'config/config_main';
import htmlTemplate from 'server/htmlTemplate';
import { StaticRouter } from 'react-router-dom';
import configureStore from 'isomorph/store';
import Root from 'isomorph/containers/Root';
import { Provider } from 'react-redux';

function isomorphRoutes(app) {
  app.get('*', function handleReactRoute(req, res, next) {
    if (req.url.indexOf('/test-') !== -1) return next();

    const store = {
      flash: req.flash() || {},
      theme: config.theme,
      ln: config.ln,
      lang: config.lang,
    };

    const renderedHtml = htmlTemplate(
      <Provider key="provider" store={configureStore(store)}>
        <StaticRouter location={req.url} context={{}}>
          <Root />
        </StaticRouter>
      </Provider>,
      store
    );

    res.status(200).send(renderedHtml);

    return next();
  });
}

export default isomorphRoutes;
