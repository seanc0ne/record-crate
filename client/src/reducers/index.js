import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import artist from './artist';
import source from './source';
import track from './track';

export default combineReducers({
  alert,
  auth,
  artist,
  source,
  track,
});
