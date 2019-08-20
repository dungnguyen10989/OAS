import Immutable from 'seamless-immutable';
import { AppState } from 'c-redux';

import { types } from './actions';

const initialState = Immutable({
  version: {
    code: 0,
    fetchingStatus: 0 //0 equals normal, -1 equals error, 1 equals fetching, 2 equals refreshing
  }
});

export default (state = initialState, { type, payload }: { type: string; payload?: any }) => {
  switch (type) {
    case types.GET_VERSION:
      return state.setIn(['version', 'fetchingStatus'], 1);

    case types.GET_VERSION_SUCCESS:
      return state.merge({ version: { code: payload, fetchingStatus: 0 } });

    case types.GET_VERSION_FAILURE:
      return state.setIn(['version', 'fetchingStatus'], -1);

    case types.GET_VERSION_CANCEL:
      return state.setIn(['version', 'fetchingStatus'], 0);

    case 'RESET_APP':
      return initialState;

    default:
      return state;
  }
};

export const selectors = (state: AppState) => ({
  versionCode: state.app.version.code,
  loadingVersionStatus: state.app.version.fetchingStatus
});
