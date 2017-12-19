import { createReducer } from 'utils/reducers';

const initialState = {};

function themeFetch(state, action) {
  return { ...state, ...action.payload };
}

export default createReducer(
  {
    THEME_FETCH: themeFetch,
  },
  initialState
);
