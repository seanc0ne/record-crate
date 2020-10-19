import { v4 as uuid } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

// can use this syntax below because of 'thunk' package
export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  const id = uuid(); // gives us a random unique id
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });
  // dispatch REMOVE_ALERT after 'timeout' seconds which is set by default at 5 seconds in line 5
  setTimeout(
    () =>
      dispatch({
        type: REMOVE_ALERT,
        payload: id,
      }),
    timeout
  );
};
