import { status } from '../helper';

export const types = {
  GET_VERSION: `${status.start}GET_VERSION`,
  GET_VERSION_SUCCESS: `${status.success}GET_VERSION`,
  GET_VERSION_FAILURE: `${status.failure}GET_VERSION`,
  GET_VERSION_CANCEL: `${status.cancel}GET_VERSION`
};

export const actions = {
  getVersion: (payload?: any, onSuccess?: Function, onError?: Function) => {
    return { type: types.GET_VERSION, payload, onSuccess, onError };
  },
  getVersionSuccess: (payload?: any, onSuccess?: Function, onError?: Function) => {
    return { type: types.GET_VERSION_SUCCESS, payload, onSuccess, onError };
  },
  getVersionFailure: (payload?: any, onSuccess?: Function, onError?: Function) => {
    return { type: types.GET_VERSION_FAILURE, payload, onSuccess, onError };
  },
  getVersionCancel: (payload?: any, onSuccess?: Function, onError?: Function) => {
    return { type: types.GET_VERSION_CANCEL, payload, onSuccess, onError };
  }
};
