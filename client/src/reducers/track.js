import {
  GET_TRACK,
  GET_TRACKS,
  GET_URLS,
  CLEAR_TRACK,
  TRACK_ERROR,
  DELETE_TRACK,
  ADD_TRACK,
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
    case ADD_TRACK:
      return {
        ...state,
        tracks: [...state.tracks, payload],
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
    case DELETE_TRACK:
      return {
        ...state,
        tracks: state.tracks.filter((track) => track._id !== payload),
        loading: false,
      };
    case TRACK_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        // track: null,
      };
    default:
      return state;
  }
}
