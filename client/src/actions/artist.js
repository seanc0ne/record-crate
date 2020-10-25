import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_ARTIST,
  GET_ARTISTS,
  UPDATE_ARTIST,
  CLEAR_ARTIST,
  ARTIST_ERROR,
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
