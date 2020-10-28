import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  EDIT_USER_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Register user
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/user', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data, // we get the token back
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors; // we want to display the array of errors
    // if there are errors we want to dispatch an alert for each of them
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL, // we don't need a payload
    });
  }
};

// Login user
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/user/login', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data, // we get the token back
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors; // we want to display the array of errors
    // if there are errors we want to dispatch an alert for each of them
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL, // we don't need a payload
    });
  }
};

// Load user
export const loadUser = () => async (dispatch) => {
  // check localStorage for a token and set the global headers with it if there is one
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/user');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Edit user
export const editUser = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.put('/api/user', formData, config);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
    dispatch(setAlert('Account updated', 'success'));
  } catch (err) {
    const errors = err.response.data.errors; // we want to display the array of errors
    // if there are errors we want to dispatch an alert for each of them
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: EDIT_USER_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Logout user
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

// Delete account
export const deleteAccount = (id) => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete('/api/user');
      dispatch({
        type: ACCOUNT_DELETED,
      });
      dispatch(setAlert('Your account has been permanently deleted'));
    } catch (err) {
      dispatch({
        type: EDIT_USER_FAIL,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
