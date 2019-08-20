import { status } from '../helper';

export const types = {
  GET_MY_APPROVED: `${status.start}GET_MY_APPROVED`,
  GET_MY_APPROVED_SUCCESS: `${status.success}GET_MY_APPROVED`,
  GET_MY_APPROVED_FAILURE: `${status.failure}GET_MY_APPROVED`,
  GET_MY_APPROVED_CANCEL: `${status.cancel}GET_MY_APPROVED`,

  SET_PAGE_NUMBER_MY_APPROVED: 'SET_PAGE_NUMBER_MY_APPROVED'
};

export const actions = {
  getMyApproved: (payload?: any) => ({ type: types.GET_MY_APPROVED, payload }),
  getMyApprovedSuccess: (payload?: any) => ({ type: types.GET_MY_APPROVED_SUCCESS, payload }),
  getMyApprovedFailure: (payload?: any) => ({ type: types.GET_MY_APPROVED_FAILURE, payload }),
  getMyApprovedCancel: () => ({ type: types.GET_MY_APPROVED_CANCEL }),

  setPageNumberMyApproved: (payload: number) => ({
    type: types.SET_PAGE_NUMBER_MY_APPROVED,
    payload
  })
};
