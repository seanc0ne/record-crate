import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import track from './track';
import artist from './artist';

export default combineReducers({
  alert,
  auth,
  track,
  artist,
});
