import axios from 'axios';

const setAuthToken = (token) => {
  // if there is a token in localStorage, set global headers with the token b/c when we have a token we send it with every request
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
