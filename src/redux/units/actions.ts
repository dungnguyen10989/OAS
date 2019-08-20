import { status } from '../helper';

export const types = {
  GET_UNITS: `${status.start}GET_UNITS`,
  GET_UNITS_SUCCESS: `${status.success}GET_UNITS`,
  GET_UNITS_FAILURE: `${status.failure}GET_UNITS`,
  GET_UNITS_CANCEL: `${status.cancel}GET_UNITS`
};

export const actions = {
  getUnits: (payload?: any) => ({ type: types.GET_UNITS, payload }),
  getUnitsSuccess: (payload?: any) => ({ type: types.GET_UNITS_SUCCESS, payload }),
  getUnitsFailure: (payload?: any) => ({ type: types.GET_UNITS_FAILURE, payload }),
  getUnitsCancel: () => ({ type: types.GET_UNITS_CANCEL })
};
