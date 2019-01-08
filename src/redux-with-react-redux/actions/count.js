export const COUNT_INCREMENT = 'COUNT_INCREMENT';
export const COUNT_INCREMENT_ASYNC = 'COUNT_INCREMENT_ASYNC';

export function increment() {
  return {
    type: COUNT_INCREMENT,
    payload: 1
  }
}

export function increment_async() {
  return dispatch => {
    setTimeout(() => {
      dispatch({
        type: COUNT_INCREMENT_ASYNC,
        payload: 1
      })
    }, 1000)
  }
}