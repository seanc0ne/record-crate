import {
  GET_SOURCE,
  GET_SOURCES,
  CLEAR_SOURCE,
  SOURCE_ERROR,
  DELETE_SOURCE,
  ADD_SOURCE,
} from '../actions/types';

const initialState = {
  source: null,
  sources: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_SOURCE:
    case UPDATE_SOURCE:
      return {
        ...state,
        source: payload,
        loading: false,
      };
    case GET_SOURCES:
      return {
        ...state,
        sources: payload,
        loading: false,
      };
    case ADD_SOURCE:
      return {
        ...state,
        sources: [...state.sources, payload],
        loading: false,
      };
    case SOURCE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        source: null,
      };
    default:
      return state;
  }
}
