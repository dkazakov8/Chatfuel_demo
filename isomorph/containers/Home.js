import React from 'react';
import { connect } from 'react-redux';
import { selectLn, selectLang, selectUsers } from 'isomorph/selectors';
import { fillUsers, getUsers, deleteUsers } from 'isomorph/actions/user';
import { withRouter } from 'react-router-dom';
import Home from 'isomorph/components/Home';

const mapStateToProps = state => ({
  ln: selectLn(state),
  lang: selectLang(state),
  users: selectUsers(state),
});

const mapDispatchToProps = {
  getUsers,
  fillUsers,
  deleteUsers,
};

const HomeContainer = props => <Home {...props} />;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeContainer));
