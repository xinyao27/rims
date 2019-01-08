import { combineReducers } from 'redux';

import count from './count';
import count2 from './count2';

export default combineReducers({
  count,
  count2,
});