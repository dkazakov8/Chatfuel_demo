import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ROUTES } from 'config/constants';
import { Route } from 'react-router-dom';
import Home from 'isomorph/containers/Home';

import HelmetMeta from '../components/HelmetMeta';

const propTypes = {
  ln: PropTypes.object,
  lang: PropTypes.string,
};

class Root extends Component {
  static propTypes = propTypes;

  render() {
    const { ln, lang } = this.props;

    return (
      <div className="Root_wrapper">
        <HelmetMeta />
        <div className="localization">{lang}</div>
        <div className="loading inactive">
          <div className="bounceball" />
          <div className="bouncetext">{ln.labels.syncCloud}</div>
        </div>
        <div className="Routes_MainLayout">
          <Route path={ROUTES.USERS_PAGE} component={Home} />
        </div>
      </div>
    );
  }
}

export default Root;
