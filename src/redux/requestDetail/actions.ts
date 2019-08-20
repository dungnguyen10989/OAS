import { status } from '../helper';

export const types = {
  GET_REQUEST_DETAIL: `${status.start}GET_REQUEST_DETAIL`,
  GET_REQUEST_DETAIL_SUCCESS: `${status.success}GET_REQUEST_DETAIL`,
  GET_REQUEST_DETAIL_FAILURE: `${status.failure}GET_REQUEST_DETAIL`,
  GET_REQUEST_DETAIL_CANCEL: `${status.cancel}GET_REQUEST_DETAIL`,

  UPDATE_REQUEST_DETAIL: `${status.start}UPDATE_REQUEST_DETAIL`,
  UPDATE_REQUEST_DETAIL_SUCCESS: `${status.success}UPDATE_REQUEST_DETAIL`,
  UPDATE_REQUEST_DETAIL_FAILURE: `${status.failure}UPDATE_REQUEST_DETAIL`,
  UPDATE_REQUEST_DETAIL_CANCEL: `${status.cancel}UPDATE_REQUEST_DETAIL`,

  GET_REQUEST_HISTORY: `${status.start}GET_REQUEST_HISTORY`,
  GET_REQUEST_HISTORY_SUCCESS: `${status.success}GET_REQUEST_HISTORY`,
  GET_REQUEST_HISTORY_FAILURE: `${status.failure}GET_REQUEST_HISTORY`,
  GET_REQUEST_HISTORY_CANCEL: `${status.cancel}GET_REQUEST_HISTORY`,

  GET_REQUEST_ATTACHMENTS: `${status.start}GET_REQUEST_ATTACHMENTS`,
  GET_REQUEST_ATTACHMENTS_SUCCESS: `${status.success}GET_REQUEST_ATTACHMENTS`,
  GET_REQUEST_ATTACHMENTS_FAILURE: `${status.failure}GET_REQUEST_ATTACHMENTS`,
  GET_REQUEST_ATTACHMENTS_CANCEL: `${status.cancel}GET_REQUEST_ATTACHMENTS`,

  CLEAR_REQUEST_DETAIL: 'CLEAR_REQUEST_DETAIL',

  APPROVE_REQUEST: `${status.start}APPROVE_REQUEST`,
  APPROVE_REQUEST_SUCCESS: `${status.success}APPROVE_REQUEST`,
  APPROVE_REQUEST_FAILURE: `${status.failure}APPROVE_REQUEST`,
  APPROVE_REQUEST_CANCEL: `${status.cancel}APPROVE_REQUEST`,

  GET_GROUP_FOR_RETURN: `${status.start}GET_GROUP_FOR_RETURN`,
  GET_GROUP_FOR_RETURN_SUCCESS: `${status.success}GET_GROUP_FOR_RETURN`,
  GET_GROUP_FOR_RETURN_FAILURE: `${status.failure}GET_GROUP_FOR_RETURN`,
  GET_GROUP_FOR_RETURN_CANCEL: `${status.cancel}GET_GROUP_FOR_RETURN`,

  GET_GROUP_FOR_MORE_TASK: `${status.start}GET_GROUP_FOR_MORE_TASK`,
  GET_GROUP_FOR_MORE_TASK_SUCCESS: `${status.success}GET_GROUP_FOR_MORE_TASK`,
  GET_GROUP_FOR_MORE_TASK_FAILURE: `${status.failure}GET_GROUP_FOR_MORE_TASK`,
  GET_GROUP_FOR_MORE_TASK_CANCEL: `${status.cancel}GET_GROUP_FOR_MORE_TASK`
};

export const actions = {
  getRequestDetail: (payload?: any) => ({ type: types.GET_REQUEST_DETAIL, payload }),
  getRequestDetailSuccess: (payload?: any) => ({ type: types.GET_REQUEST_DETAIL_SUCCESS, payload }),
  getRequestDetailFailure: (payload?: any) => ({ type: types.GET_REQUEST_DETAIL_FAILURE, payload }),
  getRequestDetailCancel: () => ({ type: types.GET_REQUEST_DETAIL_CANCEL }),

  getRequestHistory: (payload?: any) => ({ type: types.GET_REQUEST_HISTORY, payload }),
  getRequestHistorySuccess: (payload?: any) => ({
    type: types.GET_REQUEST_HISTORY_SUCCESS,
    payload
  }),
  getRequestHistoryFailure: (payload?: any) => ({
    type: types.GET_REQUEST_HISTORY_FAILURE,
    payload
  }),
  getRequestHistoryCancel: () => ({ type: types.GET_REQUEST_HISTORY_CANCEL }),
  clearRequestDetail: () => ({ type: types.CLEAR_REQUEST_DETAIL }),

  updateRequestDetail: (payload?: any) => ({ type: types.UPDATE_REQUEST_DETAIL, payload }),
  updateRequestDetailSuccess: (payload?: any) => ({
    type: types.UPDATE_REQUEST_DETAIL_SUCCESS,
    payload
  }),
  updateRequestDetailFailure: (payload?: any) => ({
    type: types.UPDATE_REQUEST_DETAIL_FAILURE,
    payload
  }),
  updateRequestDetailCancel: () => ({ type: types.UPDATE_REQUEST_DETAIL_CANCEL }),

  getRequestAttachments: (payload?: any) => ({ type: types.GET_REQUEST_ATTACHMENTS, payload }),
  getRequestAttachmentsSuccess: (payload?: any) => ({
    type: types.GET_REQUEST_ATTACHMENTS_SUCCESS,
    payload
  }),
  getRequestAttachmentsFailure: (payload?: any) => ({
    type: types.GET_REQUEST_ATTACHMENTS_FAILURE,
    payload
  }),
  getRequestAttachmentsCancel: () => ({ type: types.GET_REQUEST_ATTACHMENTS_CANCEL }),

  approveRequest: (payload?: any) => ({ type: types.APPROVE_REQUEST, payload }),
  approveRequestSuccess: (payload?: any) => ({ type: types.APPROVE_REQUEST_SUCCESS, payload }),
  approveRequestFailure: (payload?: any) => ({ type: types.APPROVE_REQUEST_FAILURE, payload }),
  approveRequestCancel: () => ({ type: types.APPROVE_REQUEST_CANCEL }),

  getGroupForReturn: (payload?: any) => ({ type: types.GET_GROUP_FOR_RETURN, payload }),
  getGroupForReturnSuccess: (payload?: any) => ({
    type: types.GET_GROUP_FOR_RETURN_SUCCESS,
    payload
  }),
  getGroupForReturnFailure: (payload?: any) => ({
    type: types.GET_GROUP_FOR_RETURN_FAILURE,
    payload
  }),
  getGroupForReturnCancel: () => ({ type: types.GET_GROUP_FOR_RETURN_CANCEL }),

  getGroupForMoreTask: (payload?: any) => ({ type: types.GET_GROUP_FOR_MORE_TASK, payload }),
  getGroupForMoreTaskSuccess: (payload?: any) => ({
    type: types.GET_GROUP_FOR_MORE_TASK_SUCCESS,
    payload
  }),
  getGroupForMoreTaskFailure: (payload?: any) => ({
    type: types.GET_GROUP_FOR_MORE_TASK_FAILURE,
    payload
  }),
  getGroupForMoreTaskCancel: () => ({ type: types.GET_GROUP_FOR_MORE_TASK_CANCEL })
};
