import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, matchPath } from 'react-router-dom';
import { ROUTES } from 'config/constants';

import ProfileEdit from '../containers/ProfileEdit';
import Profile from '../containers/Profile';

import UserItem from './UserItem';
import UserPagination from './UserPagination';

const propTypes = {
  ln: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired,
  users: PropTypes.object,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
  fillUsers: PropTypes.func.isRequired,
  deleteUsers: PropTypes.func.isRequired,
};

class Home extends Component {
  static propTypes = propTypes;

  getMatch = (props = this.props) => {
    const { location: { pathname } } = props;

    return (
      matchPath(pathname, {
        path: ROUTES.USER_PAGE,
        isExact: false,
      }) ||
      matchPath(pathname, {
        path: ROUTES.USERS_PAGE,
        isExact: false,
      })
    );
  };

  updatePage = page => {
    const match = this.getMatch();

    if (match != null) {
      const currentPage = _.get(match, 'params.page');

      this.props.getUsers({ page: _.isNumber(page) ? page : Number(currentPage) });
    }
  };

  componentDidMount = this.updatePage;

  componentWillReceiveProps = nextProps => {
    const match = this.getMatch();
    const nextMatch = this.getMatch(nextProps);
    const totalPages = _.get(nextProps, 'users.totalPages');

    if (match != null && nextMatch != null) {
      const currentPage = match.params.page;
      const nextPage = nextMatch.params.page;

      if (_.isString(nextPage)) {
        if (totalPages > 0 && Number(nextPage) > totalPages - 1)
          this.props.history.push(ROUTES.USERS_PAGE.replace(':page', totalPages - 1));
        else if (currentPage !== nextPage) this.updatePage(Number(nextPage));
      }
    }
  };

  render() {
    const {
      ln,
      history,
      fillUsers,
      deleteUsers,
      users: { data: usersData, limit, totalPages },
    } = this.props;

    const match = this.getMatch();
    const currentPage = _.get(match, 'params.page');
    const currentUserId = _.get(match, 'params.id');

    const userHeight = 157;
    const listHeight = userHeight * limit;
    const leftHeight = this.refs && this.refs.usersLeft ? this.refs.usersLeft.offsetHeight : 0;

    return (
      <div className="container" ref="container">
        <div className="users-header wrap">
          <div className="button bg-green float-left" onClick={() => fillUsers(10)}>
            {ln.labels.addUsers}
          </div>
          <div className="button bg-red float-left" onClick={() => deleteUsers()}>
            {ln.labels.removeUsers}
          </div>
        </div>
        <div className="users-body wrap">
          <div className="users-body-left float-left" ref="usersLeft">
            <div className="users-list_title color-red">{ln.labels.usersProfile}</div>
            <div className="users-list" ref="usersList" style={{ height: listHeight }}>
              <div className="users-list_container">
                {_.isArray(usersData)
                  ? usersData.map(user => (
                      <UserItem
                        key={user._id}
                        ln={ln}
                        active={user._id === currentUserId}
                        goToPath={history.push}
                        currentPage={currentPage}
                        {...user}
                      />
                    ))
                  : null}
              </div>
            </div>
            {totalPages > 0 && (
              <UserPagination currentPage={Number(currentPage)} totalPages={totalPages} />
            )}
          </div>
          <div className="users-body-right float-left" ref="profile">
            <div
              className="users-body-right_container wrap"
              ref="profileContainer"
              style={{ minHeight: leftHeight }}
            >
              <Route exact path={ROUTES.USER_PAGE} component={Profile} />
              <Route exact path={ROUTES.USER_PAGE_EDIT} component={ProfileEdit} />
            </div>
          </div>
        </div>
        <div className="users-footer wrap">
          <div className="float-left">Chatfuel demo by Dmitry Kazakov</div>
          <div className="float-right">
            Design by{' '}
            <a href="https://dribbble.com/spovv" target="_blank">
              spovv
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
