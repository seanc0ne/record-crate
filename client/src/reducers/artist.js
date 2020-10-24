import {
  GET_ARTIST,
  GET_ARTISTS,
  UPDATE_ARTIST,
  CLEAR_ARTIST,
  ARTIST_ERROR,
} from '../actions/types';

const initialState = {
  artist: null,
  artists: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ARTIST:
    case UPDATE_ARTIST:
      return {
        ...state,
        artist: payload,
        loading: false,
      };
    case GET_ARTISTS:
      return {
        ...state,
        artists: payload,
        loading: false,
      };
    case CLEAR_ARTIST:
      return {
        ...state,
        artist: null,
        loading: false,
      };
    case ARTIST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        artist: null,
      };
    default:
      return state;
  }
}
