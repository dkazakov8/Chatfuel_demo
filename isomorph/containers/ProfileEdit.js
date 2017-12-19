import React from 'react';
import { connect } from 'react-redux';
import { selectLn, selectLang, selectUsers } from 'isomorph/selectors';
import { saveUser } from 'isomorph/actions/user';
import { withRouter } from 'react-router-dom';
import ProfileEdit from 'isomorph/components/ProfileEdit';

const mapStateToProps = state => ({
  ln: selectLn(state),
  users: selectUsers(state),
});

const mapDispatchToProps = {
  saveUser,
};

const ProfileEditContainer = props => <ProfileEdit {...props} />;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileEditContainer));
