import Immutable from 'seamless-immutable';
import { AppState } from 'c-redux';

import { types } from './actions';

const initialState = Immutable({
  fetchingAuthorization: 0,
  fetchingForgotPsw: 0,
  data: {}
});

export default (state = initialState, { type, payload }: { type: string; payload?: any }) => {
  switch (type) {
    case types.LOGIN:
      return state.set('fetchingAuthorization', 1);

    case types.LOGIN_SUCCESS:
      return state.merge({ data: payload, fetchingAuthorization: 0 });

    case types.LOGIN_FAILURE:
      return state.set('fetchingAuthorization', -1);

    case types.LOGIN_CANCEL:
      return state.set('fetchingAuthorization', 0);

    case types.REQUEST_PASSWORD:
      return state.set('fetchingForgotPsw', 1);

    case types.REQUEST_PASSWORD_SUCCESS:
    case types.REQUEST_PASSWORD_CANCEL:
      return state.set('fetchingForgotPsw', 0);

    case types.REQUEST_PASSWORD_FAILURE:
      return state.set('fetchingForgotPsw', -1);

    case 'RESET_APP':
      return initialState;

    default:
      return state;
  }
};

export const selectors = (state: AppState) => ({
  data: state.auth.getIn(['data']),
  fetchingAuthorization: state.auth.getIn(['fetchingAuthorization']),
  fetchingForgotPsw: state.auth.getIn(['fetchingForgotPsw'])
});
