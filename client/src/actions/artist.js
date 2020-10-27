import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_ARTIST,
  GET_ARTISTS,
  UPDATE_ARTIST,
  CLEAR_ARTIST,
  ARTIST_ERROR,
  ADD_ARTIST,
} from './types';

// Get all artists
export const getArtists = () => async (dispatch) => {
  // dispatch({ type: CLEAR_ARTIST });
  try {
    const res = await axios.get('/api/artist');
    dispatch({
      type: GET_ARTISTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ARTIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add artist
export const addArtist = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/artist', formData, config);
    dispatch({
      type: ADD_ARTIST,
      payload: res.data,
    });
    dispatch(setAlert('Artist added', 'success'));
  } catch (err) {
    dispatch({
      type: ARTIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
