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
  console.log('*** inside getArtists in actions');
  try {
    const res = await axios.get('/api/artist');
    console.log('res.data BEFORE dispatch', res.data);
    dispatch({
      type: GET_ARTISTS,
      payload: res.data,
    });
    console.log('res.data AFTER dispatch', res.data);
  } catch (err) {
    dispatch({
      type: ARTIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
