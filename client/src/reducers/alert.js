import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
  // action has a type (which is required), and a payload/data (which is optional)
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      // we want to add an alert, so we copy the current state with whatever alerts are already in there (...state), and we add our alert
      return [...state, payload];
    case REMOVE_ALERT:
      // we want to remove a specific alert by its ID
      return state.filter((alert) => alert.id !== payload); // return all alerts except for the one that matches the payload (which will be the ID of the alert to remove)
    default:
      return state;
  }
}
