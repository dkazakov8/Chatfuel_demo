import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ROUTES } from 'config/constants';

const dots = key => (
  <div key={key} className="pagination-dots">
    ...
  </div>
);

const propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};

class UserPagination extends Component {
  static propTypes = propTypes;

  renderLink = pageNumber => {
    const { currentPage } = this.props;

    return (
      <Link
        key={pageNumber}
        to={ROUTES.USER_PAGE.replace(':page', pageNumber).replace(':id', '')}
        className={
          currentPage === pageNumber
            ? 'users-list_pagination-item active'
            : 'users-list_pagination-item'
        }
      >
        {pageNumber + 1}
      </Link>
    );
  };

  render() {
    const { totalPages, currentPage } = this.props;

    const prevPage = currentPage === 0 ? 0 : currentPage - 1;
    const nextPage = currentPage === totalPages - 1 ? currentPage : currentPage + 1;

    let pagination = [];

    if (totalPages > 5) {
      pagination.push(this.renderLink(0));
      pagination.push(dots('firstDots'));

      if (currentPage === 0) pagination.push(this.renderLink(1));
      else if (currentPage === totalPages - 1) pagination.push(this.renderLink(totalPages - 2));
      else pagination.push(this.renderLink(currentPage));

      pagination.push(dots('secondDots'));
      pagination.push(this.renderLink(totalPages - 1));
    } else pagination = [...new Array(totalPages)].map((empty, i) => this.renderLink(i));

    return (
      <div className="users-list_pagination">
        <Link
          className="users-list_pagination-item"
          to={ROUTES.USER_PAGE.replace(':page', prevPage).replace(':id', '')}
        >
          &lt;
        </Link>
        {pagination}
        <Link
          className="users-list_pagination-item"
          to={ROUTES.USER_PAGE.replace(':page', nextPage).replace(':id', '')}
        >
          &gt;
        </Link>
      </div>
    );
  }
}

export default UserPagination;
