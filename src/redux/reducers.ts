import { combineReducers } from 'redux';

import { appReducer } from './app';
import { authReducer } from './auth';
import { taskReducer } from './task';
import { filterReducer } from './filter';
import { unitsReducer } from './units';
import { requestDetailReducer } from './requestDetail';
import { myApprovedReducer } from './myApproved';
import { openingRequestReducer } from './openingRequest';

export default combineReducers({
  app: appReducer,
  auth: authReducer,
  task: taskReducer,
  openingRequest: openingRequestReducer,
  requestDetail: requestDetailReducer,
  filter: filterReducer,
  units: unitsReducer,
  myApproved: myApprovedReducer
});
