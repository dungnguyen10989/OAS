import Immutable from 'seamless-immutable';
import { getOr } from 'lodash/fp';
import _ from 'lodash';
import { Action } from 'redux';
import { AppState } from 'c-redux';
import { PAGE_SIZE } from '../../constants';
import { removeDuplicates } from '../helper';
import { requestDetailTypes } from '../requestDetail';

import { types } from './actions';

const initialState = Immutable({
  data: new Array(),
  pageNumber: 0,
  fetchingTask: 0
});

export default (state = initialState, action: Action) => {
  const { type } = action;
  const payload: any = getOr({}, 'payload', action);

  switch (type) {
    case types.GET_TASK:
      return state.set('fetchingTask', payload.pageNumber === undefined ? 2 : 1);

    case types.GET_TASK_SUCCESS:
      const { pageNumber, data } = payload;
      const _page = pageNumber || 0;
      const pageImproved = data.length === PAGE_SIZE ? _page + 1 : _page;

      if (_page === 0 || !pageNumber) {
        return state.merge({ data, fetchingTask: 0, pageNumber: pageImproved });
      }
      return state.merge({
        data: removeDuplicates(state.data.concat(data), 'id'),
        fetchingTask: 0,
        pageNumber: pageImproved
      });

    case types.GET_TASK_FAILURE:
      return state.set('fetchingTask', -1);

    case types.GET_TASK_CANCEL:
      return state.set('fetchingTask', 0);

    case types.SET_PAGE_NUMBER_TASK:
      return state.set('pageNumber', payload);

    case requestDetailTypes.APPROVE_REQUEST_SUCCESS:
      const _data = state.data.filter(i => i.id !== payload.id);
      return state.set('data', _data);

    case types.CLEAR_TASK:
    case 'RESET_APP':
      return initialState;

    default:
      return state;
  }
};

export const selectors = (state: AppState) => {
  return {
    data: state.task.getIn(['data']),
    pageNumber: state.task.getIn(['pageNumber']),
    fetchingTask: state.task.getIn(['fetchingTask'])
  };
};
