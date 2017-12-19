import { createReducer } from 'utils/reducers';

const initialState = {};

function langFetch(state, action) {
  return { ...state, ...action.payload };
}

export default createReducer(
  {
    LANG_FETCH: langFetch,
  },
  initialState
);
