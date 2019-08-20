import { status } from '../helper';

export const types = {
  LOGIN: `${status.start}LOGIN`,
  LOGIN_SUCCESS: `${status.success}LOGIN`,
  LOGIN_FAILURE: `${status.failure}LOGIN`,
  LOGIN_CANCEL: `${status.cancel}LOGIN`,

  GET_USER_INFO: `${status.start}GET_USER_INFO`,
  GET_USER_INFO_SUCCESS: `${status.success}GET_USER_INFO`,
  GET_USER_INFO_FAILURE: `${status.failure}GET_USER_INFO`,
  GET_USER_INFO_CANCEL: `${status.cancel}GET_USER_INFO`,

  REQUEST_PASSWORD: `${status.start}REQUEST_PASSWORD`,
  REQUEST_PASSWORD_SUCCESS: `${status.success}REQUEST_PASSWORD`,
  REQUEST_PASSWORD_FAILURE: `${status.failure}REQUEST_PASSWORD`,
  REQUEST_PASSWORD_CANCEL: `${status.cancel}REQUEST_PASSWORD`
};

export const actions = {
  login: (payload?: any) => ({ type: types.LOGIN, payload }),
  loginSuccess: (payload?: any) => ({ type: types.LOGIN_SUCCESS, payload }),
  loginFailure: (payload?: any) => ({ type: types.LOGIN_FAILURE, payload }),
  loginCancel: () => ({ type: types.LOGIN_CANCEL })
};
