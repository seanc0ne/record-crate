import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_SOURCE,
  GET_SOURCES,
  CLEAR_SOURCE,
  SOURCE_ERROR,
  DELETE_SOURCE,
  ADD_SOURCE,
} from './types';

// Get all sources
export const getSources = () => async (dispatch) => {
  // dispatch({ type: CLEAR_SOURCE });
  try {
    const res = await axios.get('/api/source');
    dispatch({
      type: GET_SOURCES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SOURCE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add source
export const addSource = (formData) => async (dispatch) => {
  console.log('formData from within addSource action: ', formData);
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    console.log('config', config);
    console.log('formData', formData);
    const res = await axios.post('/api/source', formData, config);
    dispatch({
      type: ADD_SOURCE,
      payload: res.data,
    });
    console.log('res.data', res.data);
    dispatch(setAlert('Source added', 'success'));
  } catch (err) {
    dispatch({
      type: SOURCE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
