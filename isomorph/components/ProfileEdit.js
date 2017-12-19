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
  history: PropTypes.object.isRequired,
  saveUser: PropTypes.func.isRequired,
};

class ProfileEdit extends Component {
  static propTypes = propTypes;

  state = {
    currentUserData: {},
  };

  updateValues = updatedField => {
    this.setState({
      currentUserData: Object.assign({}, this.state.currentUserData, {
        [updatedField]: this.refs[updatedField].value,
      }),
    });
  };

  updateState = (props = this.props) => {
    const { match: { params: { id: currentUserId } }, users } = props;

    const usersData = _.get(users, 'data') || null;
    const currentUserData =
      currentUserId != null ? _.find(usersData, { _id: currentUserId }) || null : null;

    if (currentUserData != null) this.setState({ currentUserData });
  };

  componentWillMount = this.updateState;

  componentWillReceiveProps = this.updateState;

  render() {
    const { match: { params: { page: currentPage } }, ln, saveUser } = this.props;
    const { currentUserData } = this.state;

    if (currentUserData._id == null) return null;

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
        <div className="profile-info_value">
          <input
            type="text"
            ref={item}
            onChange={() => this.updateValues(item)}
            value={_.isString(currentUserData[item]) ? currentUserData[item] : ''}
          />
        </div>
      </div>
    ));

    const is_saving = false;

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
          <div
            className="button bg-green float-left"
            onClick={() => saveUser(currentUserData, currentPage)}
          >
            {is_saving ? langLabels.saving : langLabels.save}
          </div>
          <Link
            to={ROUTES.USER_PAGE.replace(':page', currentPage).replace(':id', _id)}
            className="button bg-red float-right"
          >
            {langLabels.cancel}
          </Link>
        </div>
      </div>
    );
  }
}

export default ProfileEdit;
