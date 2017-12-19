import React from 'react';
import { connect } from 'react-redux';
import { selectLn, selectLang, selectUsers } from 'isomorph/selectors';
import { deleteUser } from 'isomorph/actions/user';
import { withRouter } from 'react-router-dom';
import Profile from 'isomorph/components/Profile';

const mapStateToProps = state => ({
  ln: selectLn(state),
  users: selectUsers(state),
});

const mapDispatchToProps = {
  deleteUser,
};

const ProfileContainer = props => <Profile {...props} />;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileContainer));
