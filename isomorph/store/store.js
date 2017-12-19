import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducers from '../reducers';

export default function configureStore(globalStore) {
  const enhancer = compose(applyMiddleware(thunkMiddleware));

  return createStore(reducers, globalStore, enhancer);
}
