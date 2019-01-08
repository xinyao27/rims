import * as actions from '../actions/count2';

export default function(state = 0, action) {
  switch(action.type) {
    case actions.COUNT2_INCREMENT:
      return state + action.payload;
    case actions.COUNT2_INCREMENT_ASYNC:
      return state + action.payload;
    default:
      return state;
  }
}