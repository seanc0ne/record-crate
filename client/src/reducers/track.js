import {
  GET_TRACK,
  GET_TRACKS,
  GET_URLS,
  UPDATE_TRACK,
  CLEAR_TRACK,
  TRACK_ERROR,
} from '../actions/types';

const initialState = {
  track: null,
  tracks: [],
  urls: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_TRACK:
    case UPDATE_TRACK:
      return {
        ...state,
        track: payload,
        loading: false,
      };
    case GET_TRACKS:
      return {
        ...state,
        tracks: payload,
        loading: false,
      };
    case GET_URLS:
      return {
        ...state,
        repos: payload,
        loading: false,
      };
    case CLEAR_TRACK:
      return {
        ...state,
        track: null,
        urls: [],
        loading: false,
      };
    case TRACK_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        track: null,
      };
    default:
      return state;
  }
}
