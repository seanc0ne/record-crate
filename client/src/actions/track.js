import axios from 'axios';
import { setAlert } from './alert';
import { GET_TRACK, GET_TRACKS, TRACK_ERROR } from './types';

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
