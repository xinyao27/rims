import * as actions from '../actions/count';

export default function(state = 0, action) {
  switch(action.type) {
    case actions.COUNT_INCREMENT:
      return state + action.payload;
    case actions.COUNT_INCREMENT_ASYNC:
      return state + action.payload;
    default:
      return state;
  }
}