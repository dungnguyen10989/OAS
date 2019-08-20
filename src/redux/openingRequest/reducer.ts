import Immutable from 'seamless-immutable';
import { getOr } from 'lodash/fp';
import _ from 'lodash';
import { Action } from 'redux';
import { AppState } from 'c-redux';
import { PAGE_SIZE } from '../../constants';
import { removeDuplicates } from '../helper';

import { types } from './actions';

const initialState = Immutable({
  data: new Array(),
  pageNumber: 0,
  fetchingOpeningRequest: 0,
  fetchingEditRequest: 0
});

export default (state = initialState, action: Action) => {
  const { type } = action;
  const payload: any = getOr({}, 'payload', action);

  switch (type) {
    case types.GET_OPENING_REQUEST:
      return state.set('fetchingOpeningRequest', payload.pageNumber === undefined ? 2 : 1);

    case types.GET_OPENING_REQUEST_SUCCESS:
      const { pageNumber, data } = payload;
      const _page = pageNumber || 0;
      const pageImproved = data.length === PAGE_SIZE ? _page + 1 : _page;

      if (_page === 0 || !pageNumber) {
        return state.merge({ data, fetchingOpeningRequest: 0, pageNumber: pageImproved });
      }
      return state.merge({
        data: removeDuplicates(state.data.concat(data), 'id'),
        fetchingOpeningRequest: 0,
        pageNumber: pageImproved
      });

    case types.GET_OPENING_REQUEST_CANCEL:
      return state.set('fetchingOpeningRequest', -1);

    case types.SET_PAGE_NUMBER_REQUEST:
      return state.set('pageNumber', payload);

    case types.EDIT_OPENING_REQUEST:
      return state.set('fetchingEditRequest', -1);
    case types.EDIT_OPENING_REQUEST_SUCCESS:
      return state.set('fetchingEditRequest', 0);
    case types.EDIT_OPENING_REQUEST_FAILURE:
      return state.set('fetchingEditRequest', -1);
    case types.EDIT_OPENING_REQUEST_CANCEL:
      return state.set('fetchingEditRequest', 0);

    default:
      return state;
  }
};

export const selectors = (state: AppState) => {
  return {
    data: state.openingRequest.getIn(['data']),
    pageNumber: state.openingRequest.getIn(['pageNumber']),
    fetchingOpeningRequest: state.openingRequest.getIn(['fetchingOpeningRequest']),
    fetchingEditRequest: state.openingRequest.getIn(['fetchingEditRequest'])
  };
};
