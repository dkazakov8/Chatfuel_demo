import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

class HelmetMeta extends Component {
  render() {
    return (
      <Helmet titleTemplate="%s | Chatfuel" defaultTitle="Chatfuel">
        <html lang="en" />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="referrer" content="unsafe-url" />
        <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <link rel="stylesheet" href="/styles.css" />
      </Helmet>
    );
  }
}

export default HelmetMeta;
