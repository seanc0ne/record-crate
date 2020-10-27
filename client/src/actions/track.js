import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_TRACK,
  GET_TRACKS,
  UPDATE_TRACK,
  CLEAR_TRACK,
  TRACK_ERROR,
  DELETE_TRACK,
  ADD_TRACK,
} from './types';

// Get all tracks
export const getTracks = () => async (dispatch) => {
  dispatch({ type: CLEAR_TRACK });
  try {
    const res = await axios.get('/api/track');
    dispatch({
      type: GET_TRACKS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TRACK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get a track by ID
export const getTrackById = (trackId) => async (dispatch) => {
  console.log('trackId', trackId);
  try {
    const res = await axios.get(`/api/track/${trackId}`);
    console.log('payload inside getTrackById BEFORE dispatch', res.data);
    dispatch({
      type: GET_TRACK,
      payload: res.data,
    });
    console.log('payload inside getTrackById AFTER dispatch', res.data);
  } catch (err) {
    console.log('MAYDAY! ERROR inside getTrackById');
    dispatch({
      type: TRACK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add a track - note: the 'history' object has a push method within
export const addTrack = (selectedSourceId, trackObj) => async (dispatch) => {
  console.log(
    'selectedSourceId from within addTrack action: ',
    selectedSourceId
  );
  console.log('trackObj from within addTrack action: ', trackObj);
  trackObj.sourceId = selectedSourceId;
  console.log('trackObj after adding selectedSourceId: ', trackObj);
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('/api/track', trackObj, config);
    dispatch({
      type: ADD_TRACK,
      payload: res.data,
    });
    console.log('res.data', res.data);
    dispatch(setAlert('Track saved', 'success'));
  } catch (err) {
    const errors = err.response.data.errors; // we want to display the array of errors
    // if there are errors we want to dispatch an alert for each of them
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: TRACK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
