import _ from 'lodash';
import { createReducer } from 'utils/reducers';

const initialState = {
  data: null,
  limit: 0,
  total: 0,
  totalPages: 0,
  isFetching: true,
  isError: false,
};

function usersFetch(state, action) {
  return { ...state, isError: false, isFetching: true };
}

function usersFetchError(state, action) {
  return { ...state, data: null, isError: true, isFetching: false };
}

function usersFetchSuccess(state, action) {
  const { limit, users, total, totalPages, page } = action.payload;

  return {
    ...state,
    data: users,
    limit,
    total,
    page,
    totalPages,
    isError: false,
    isFetching: false,
  };
}

export default createReducer(
  {
    USERS_FETCH: usersFetch,
    USERS_FETCH_ERROR: usersFetchError,
    USERS_FETCH_SUCCESS: usersFetchSuccess,
  },
  initialState
);
