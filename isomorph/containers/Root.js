import React from 'react';
import { connect } from 'react-redux';
import { selectLn, selectLang } from 'isomorph/selectors';
import { withRouter } from 'react-router-dom';
import Root from 'isomorph/components/Root';

const mapStateToProps = state => ({
  ln: selectLn(state),
  lang: selectLang(state),
});

const RootContainer = props => <Root {...props} />;

export default withRouter(connect(mapStateToProps)(RootContainer));
