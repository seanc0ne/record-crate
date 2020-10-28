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
  try {
    const res = await axios.get(`/api/track/${trackId}`);
    dispatch({
      type: GET_TRACK,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TRACK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add a track
export const addTrack = (selectedSourceId, trackObj) => async (dispatch) => {
  trackObj.sourceId = selectedSourceId;
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

// Delete a track by ID
export const deleteTrack = (trackId) => async (dispatch) => {
  try {
    await axios.delete(`/api/track/${trackId}`);
    dispatch({
      type: DELETE_TRACK,
      payload: trackId,
    });
    dispatch(setAlert('Track removed', 'success'));
  } catch (err) {
    dispatch({
      type: TRACK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
