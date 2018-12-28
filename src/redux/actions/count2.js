export const COUNT2_INCREMENT = 'COUNT2_INCREMENT';
export const COUNT2_INCREMENT_ASYNC = 'COUNT2_INCREMENT_ASYNC';

export function increment() {
  return {
    type: COUNT2_INCREMENT,
    payload: 1
  }
}

export function increment_async() {
  return dispatch => {
    setTimeout(() => {
      dispatch({
        type: COUNT2_INCREMENT_ASYNC,
        payload: 1
      })
    }, 1000)
  }
}