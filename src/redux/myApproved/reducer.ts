import Immutable from 'seamless-immutable';
import { getOr } from 'lodash/fp';
import { Action } from 'redux';
import { AppState } from 'c-redux';
import { PAGE_SIZE } from '../../constants';
import { removeDuplicates } from '../helper';
import { requestDetailTypes } from '../requestDetail';

import { types } from './actions';

const initialState = Immutable({
  data: new Array(),
  pageNumber: 0,
  fetchingMyApproved: 0
});

export default (state = initialState, action: Action) => {
  const { type } = action;
  const payload: any = getOr({}, 'payload', action);

  switch (type) {
    case types.GET_MY_APPROVED:
      return state.set('fetchingMyApproved', payload.pageNumber === undefined ? 2 : 1);

    case types.GET_MY_APPROVED_SUCCESS:
      const { pageNumber, data } = payload;
      const _page = pageNumber || 0;
      const pageImproved = data.length === PAGE_SIZE ? _page + 1 : _page;

      if (_page === 0) {
        return state.merge({ data, fetchingMyApproved: 0, pageNumber: pageImproved });
      }
      return state.merge({
        data: removeDuplicates(state.data.concat(data), 'id'),
        fetchingMyApproved: 0,
        pageNumber: pageImproved
      });

    case types.GET_MY_APPROVED_FAILURE:
      return state.set('fetchingMyApproved', -1);

    case types.GET_MY_APPROVED_CANCEL:
      return state.set('fetchingMyApproved', 0);

    case types.SET_PAGE_NUMBER_MY_APPROVED:
      return state.set('pageNumber', payload);

    case requestDetailTypes.APPROVE_REQUEST_SUCCESS:
      const _data = state.data.concat([payload]);
      return state.set('data', _data);

    case 'RESET_APP':
      return initialState;

    default:
      return state;
  }
};

export const selectors = (state: AppState) => {
  return {
    data: state.myApproved.getIn(['data']),
    pageNumber: state.myApproved.getIn(['pageNumber']),
    fetchingMyApproved: state.myApproved.getIn(['fetchingMyApproved'])
  };
};
