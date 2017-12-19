import { createReducer } from 'utils/reducers';

const initialState = {};

function flashFetch(state, action) {
  return { ...state, ...action.payload };
}

export default createReducer(
  {
    FLASH_FETCH: flashFetch,
  },
  initialState
);
