import axios from 'axios';
import { setAlert } from './alert';
import { GET_TRACK, GET_TRACKS, UPDATE_TRACK, TRACK_ERROR } from './types';

// Get all tracks
export const getTracks = () => async (dispatch) => {
  // dispatch({ type: CLEAR_TRACK });
  console.log('****inside getTracks()');
  try {
    const res = await axios.get('api/track');
    console.log('res.data from within getTracks()', res.data);
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
    const res = await axios.get(`api/track/${trackId}`);
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

// Create a track - note: the 'history' object has a push method within
export const createTrack = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('/api/track', formData, config);
    dispatch({
      type: GET_TRACK,
      payload: res.data,
    });
    dispatch(setAlert('Track saved', 'success'));
    // Redirect to dashboard
    history.push('/dashboard'); // redirecting in an action is different - we cannot use the Redirect -  we have to use the push method within the history object
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

// Add source
export const addSource = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.put('/api/source', formData, config);
    dispatch({
      type: UPDATE_TRACK,
      payload: res.data,
    });
    dispatch(setAlert('Source added', 'success'));
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
