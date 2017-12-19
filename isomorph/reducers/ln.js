import { createReducer } from 'utils/reducers';

const initialState = {};

function lnFetch(state, action) {
  return { ...state, ...action.payload };
}

export default createReducer(
  {
    LN_FETCH: lnFetch,
  },
  initialState
);
