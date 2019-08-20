import Immutable from 'seamless-immutable';
import { AppState, Action, FetchRequestParams } from 'c-redux';

import { types } from './actions';

const init: FetchRequestParams = {
  isOverDeadline: undefined,
  pageNumber: 0,
  keyword: undefined,
  status: undefined,
  type: undefined,
  userName: undefined
};

const initialState = Immutable(init);

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case types.SET_FILTER:
      return state.merge(action.payload);

    case types.SET_FILTER_TYPE:
      return state.setIn(['type'], action.payload);

    case types.RESET_FILTER:
    case 'RESET_APP':
      return initialState;

    default:
      return state;
  }
};

export const selectors = (state: AppState) => state.filter;
