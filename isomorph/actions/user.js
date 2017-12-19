import _ from 'lodash';
import { makeRequest, getResponseData } from 'utils/actions';
import { ROUTES } from 'config/constants';

export function getUsers(params) {
  return dispatch => {
    const query = {
      url: ROUTES.GET_USERS,
      method: 'post',
      params: _.isObject(params) ? params : null,
    };

    dispatch({
      type: 'USERS_FETCH',
    });

    return Promise.resolve(query)
      .then(makeRequest)
      .then(getResponseData)
      .then(data => {
        dispatch({
          type: 'USERS_FETCH_SUCCESS',
          payload: data.data,
        });

        return Promise.resolve();
      })
      .catch(error => {
        dispatch({
          type: 'USERS_FETCH_ERROR',
        });
        console.log('error', error);
      });
  };
}

export function fillUsers(totalUsers = 10) {
  return dispatch => {
    const query = {
      url: ROUTES.PUT_RANDOM_USERS,
      method: 'put',
      params: { totalUsers },
    };

    return Promise.resolve(query)
      .then(makeRequest)
      .then(getResponseData)
      .then(data => {
        getUsers({ page: 0 })(dispatch);
      })
      .catch(error => {
        console.log('error', error);
      });
  };
}

export function saveUser(data, currentPage) {
  return dispatch => {
    const query = {
      url: ROUTES.SAVE_USER,
      method: 'put',
      params: { data },
    };

    return Promise.resolve(query)
      .then(makeRequest)
      .then(getResponseData)
      .then(response => {
        getUsers({ page: currentPage })(dispatch);
      })
      .catch(error => {
        console.log('error', error);
      });
  };
}

export function deleteUsers() {
  return dispatch => {
    const query = {
      url: ROUTES.DELETE_USERS,
      method: 'delete',
    };

    return Promise.resolve(query)
      .then(makeRequest)
      .then(getResponseData)
      .then(data => {
        getUsers({ page: 0 })(dispatch);
      })
      .catch(error => {
        console.log('error', error);
      });
  };
}

export function deleteUser(id, currentPage) {
  return dispatch => {
    const query = {
      url: ROUTES.DELETE_USER,
      method: 'delete',
      params: { data: { id } },
    };

    return Promise.resolve(query)
      .then(makeRequest)
      .then(getResponseData)
      .then(data => {
        getUsers({ page: currentPage })(dispatch);
      })
      .catch(error => {
        console.log('error', error);
      });
  };
}
