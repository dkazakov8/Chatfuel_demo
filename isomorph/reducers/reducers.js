import { combineReducers } from 'redux';

import ln from './ln';
import lang from './lang';
import users from './users';
import flash from './flash';
import theme from './theme';

export default combineReducers({
  ln,
  lang,
  users,
  flash,
  theme,
});
