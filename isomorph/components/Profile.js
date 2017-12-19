import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'utils/TimeFormat';
import { Link } from 'react-router-dom';
import { ROUTES } from 'config/constants';

const propTypes = {
  ln: PropTypes.object.isRequired,
  users: PropTypes.object,
  match: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired,
};

class Profile extends Component {
  static propTypes = propTypes;

  render() {
    const {
      ln,
      match: { params: { page: currentPage, id: currentUserId } },
      deleteUser,
      users,
    } = this.props;

    const usersData = _.get(users, 'data') || null;
    const currentUserData =
      currentUserId != null ? _.find(usersData, { _id: currentUserId }) : null;

    if (currentUserData == null) return null;

    const { _id, picture, is_active, registered_at } = currentUserData;

    const avatar = picture.thumbnail ? <img src={picture.medium} /> : null;

    const profileInfo = {
      first_name: 'text',
      last_name: 'text',
      gender: 'text',
      phone: 'text',
    };
    const langLabels = ln.labels;

    const fieldsProfileInfo = Object.keys(profileInfo).map((item, key) => (
      <div key={key} className="profile-info_block float-left">
        <div className="profile-info_label">{langLabels[item]}:</div>
        <div className="profile-info_value">{currentUserData[item]}</div>
      </div>
    ));

    return (
      <div className="profile_animating" ref="animating">
        <div className="profile_title">
          {langLabels.profileDetails}&nbsp;-&nbsp;
          <span className={is_active ? 'profile_enabled color-green' : 'profile_enabled color-red'}>
            {is_active ? langLabels.enabled : langLabels.disabled}
          </span>
        </div>
        <div className="profile-card">
          <div className="profile-card_avatar bg-lightgrey">{avatar}</div>
          <div className="profile-card_info">
            <div className="profile-card_block wrap">
              <div className="profile-card_key float-left">Дата создания:</div>
              <div className="profile-card_value float-left">
                {new Date(registered_at).format('dd-mm-yyyy HH:MM:ss')}
              </div>
            </div>
          </div>
        </div>
        <div className="profile_title">{langLabels.profileInfo}</div>
        <div className="profile-info wrap">{fieldsProfileInfo}</div>
        <div className="profile-submits wrap">
          <Link
            to={ROUTES.USER_PAGE_EDIT.replace(':page', currentPage).replace(':id', _id)}
            className="button bg-green float-left"
          >
            {langLabels.edit}
          </Link>
          <div className="button bg-red float-right" onClick={() => deleteUser(_id, currentPage)}>
            {langLabels.remove}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
