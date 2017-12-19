import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ROUTES } from 'config/constants';

const propTypes = {
  ln: PropTypes.object,
  _id: PropTypes.string,
  email: PropTypes.string,
  active: PropTypes.bool,
  is_active: PropTypes.bool,
  picture: PropTypes.object,
  goToPath: PropTypes.func,
  last_name: PropTypes.string,
  first_name: PropTypes.string,
  currentPage: PropTypes.string,
};

class UserItem extends Component {
  static propTypes = propTypes;

  render() {
    const {
      ln,
      _id,
      email,
      active,
      picture,
      goToPath,
      last_name,
      is_active,
      first_name,
      currentPage,
    } = this.props;

    const avatar = picture.thumbnail ? <img src={picture.medium} /> : null;

    return (
      <div
        onClick={() => goToPath(ROUTES.USER_PAGE.replace(':id', _id).replace(':page', currentPage))}
        className={active ? 'user-item user-item-active' : 'user-item'}
      >
        <div className="user-item_avatar bg-lightgrey">{avatar}</div>
        <div className="user-item_info">
          <div className="user-item_name">
            {first_name} {last_name}
          </div>
          <div className="user-item_email">Email: {email}</div>
          <div
            className={is_active ? 'user-item_enabled color-green' : 'user-item_enabled color-red'}
          >
            {is_active ? ln.labels.enabled : ln.labels.disabled}
          </div>
        </div>
      </div>
    );
  }
}

export default UserItem;
