import Immutable from 'seamless-immutable';
import { AppState } from 'c-redux';

import { types } from './actions';

const initialState = Immutable({
  data: [],
  fetchingUnits: 0
});

export default (state = initialState, { type, payload }: { type: string; payload?: any }) => {
  switch (type) {
    case types.GET_UNITS:
      return state.set('fetchingUnits', 1);

    case types.GET_UNITS_SUCCESS:
      return state.merge({ data: payload, fetchingUnits: 0 });

    case types.GET_UNITS_FAILURE:
      return state.set('fetchingUnits', -1);

    case types.GET_UNITS_CANCEL:
      return state.set('fetchingUnits', 0);

    case 'RESET_APP':
      return initialState;

    default:
      return state;
  }
};

export const selectors = (state: AppState) => {
  return {
    units: state.units.getIn(['data']),
    fetchingUnits: state.units.getIn(['fetchingUnits'])
  };
};
