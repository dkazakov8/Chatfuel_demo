import React from 'react';
import { renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet';

function getHtml(App, store) {
  const helmet = Helmet.renderStatic();

  let html = `<!DOCTYPE html><html ${helmet.htmlAttributes.toString()}>`;

  html = `${html}<head>`;
  html = html + helmet.title.toString();
  html = html + helmet.meta.toString();
  html = html + helmet.link.toString();
  html = html + helmet.style.toString();
  html = `${html}</head>`;
  html = `${html}<body ${helmet.bodyAttributes.toString()}>`;
  html = `${html}<div id="react-view">${renderToString(App)}</div>`;
  html = `${html}<script charset="UTF-8">window.globalStore = ${JSON.stringify(store)};</script>`;
  html = `${html}<script src="/bundle.js" charset="UTF-8" async="async"></script>`;
  html = html + helmet.script.toString();
  html = `${html}</body></html>`;

  return html;
}

export default getHtml;
