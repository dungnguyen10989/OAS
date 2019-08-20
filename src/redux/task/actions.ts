import { status } from '../helper';

export const types = {
  GET_TASK: `${status.start}GET_TASK`,
  GET_TASK_SUCCESS: `${status.success}GET_TASK`,
  GET_TASK_FAILURE: `${status.failure}GET_TASK`,
  GET_TASK_CANCEL: `${status.cancel}GET_TASK`,

  GET_OPENING_TASK: `${status.start}GET_OPENING_TASK`,
  GET_OPENING_TASK_SUCCESS: `${status.success}GET_OPENING_TASK`,
  GET_OPENING_TASK_FAILURE: `${status.failure}GET_OPENING_TASK`,
  GET_OPENING_TASK_CANCEL: `${status.cancel}GET_OPENING_TASK`,

  SET_PAGE_NUMBER_TASK: 'SET_PAGE_NUMBER_TASK',
  CLEAR_TASK: 'CLEAR_TASK'
};

export const actions = {
  getTask: (payload?: any) => ({ type: types.GET_TASK, payload }),
  getTaskSuccess: (payload?: any) => ({ type: types.GET_TASK_SUCCESS, payload }),
  getTaskFailure: (payload?: any) => ({ type: types.GET_TASK_FAILURE, payload }),
  getTaskCancel: () => ({ type: types.GET_TASK_CANCEL }),

  setPageNumberTask: (payload?: number) => ({ type: types.SET_PAGE_NUMBER_TASK, payload }),
  clearTask: () => ({ type: types.CLEAR_TASK })
};
