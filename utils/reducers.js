/**
 * Assemble reducerss
 */
export function createReducer(handlers, initialState) {
  return function reducer(state = initialState, action) {
    return handlers[action.type] ? handlers[action.type](state, action) : state;
  };
}
