import { combineEpics } from 'redux-observable';

import { appEpic } from './app';
import { authEpic } from './auth';
import { taskEpic } from './task';
import { openingRequestEpic } from './openingRequest';

import { myApprovedEpic } from './myApproved';
import { unitsEpic } from './units';
import { requestDetailEpic } from './requestDetail';

export default combineEpics(
  appEpic,
  authEpic,
  taskEpic,
  openingRequestEpic,
  requestDetailEpic,
  unitsEpic,
  myApprovedEpic
);
