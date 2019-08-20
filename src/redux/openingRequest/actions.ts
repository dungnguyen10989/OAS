import { status } from '../helper';

export const types = {
  GET_OPENING_REQUEST: `${status.start}GET_OPENING_REQUEST`,
  GET_OPENING_REQUEST_SUCCESS: `${status.success}GET_OPENING_REQUEST`,
  GET_OPENING_REQUEST_FAILURE: `${status.failure}GET_OPENING_REQUEST`,
  GET_OPENING_REQUEST_CANCEL: `${status.cancel}GET_OPENING_REQUEST`,

  EDIT_OPENING_REQUEST: `${status.start}EDIT_OPENING_REQUEST`,
  EDIT_OPENING_REQUEST_SUCCESS: `${status.success}EDIT_OPENING_REQUEST`,
  EDIT_OPENING_REQUEST_FAILURE: `${status.failure}EDIT_OPENING_REQUEST`,
  EDIT_OPENING_REQUEST_CANCEL: `${status.cancel}EDIT_OPENING_REQUEST`,

  SET_PAGE_NUMBER_REQUEST: 'SET_PAGE_NUMBER_REQUEST'
};

export const actions = {
  getOpeningRequest: (payload?: any) => ({ type: types.GET_OPENING_REQUEST, payload }),
  getOpeningRequestSuccess: (payload?: any) => ({
    type: types.GET_OPENING_REQUEST_SUCCESS,
    payload
  }),
  getOpeningRequestFailure: (payload?: any) => ({
    type: types.GET_OPENING_REQUEST_FAILURE,
    payload
  }),
  getOpeningRequestCancel: () => ({ type: types.GET_OPENING_REQUEST_CANCEL }),

  editOpeningRequest: (payload?: any) => ({ type: types.EDIT_OPENING_REQUEST, payload }),
  editOpeningRequestSuccess: (payload?: any) => ({
    type: types.EDIT_OPENING_REQUEST_SUCCESS,
    payload
  }),
  editOpeningRequestFailure: (payload?: any) => ({
    type: types.EDIT_OPENING_REQUEST_FAILURE,
    payload
  }),
  editOpeningRequestCancel: () => ({ type: types.EDIT_OPENING_REQUEST_CANCEL }),

  setPageNumberRequest: (payload?: number) => ({ type: types.SET_PAGE_NUMBER_REQUEST, payload })
};
