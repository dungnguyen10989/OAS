import Immutable from 'seamless-immutable';
import { getOr } from 'lodash/fp';
import { Action } from 'redux';
import { AppState } from 'c-redux';

import { types } from './actions';

const initialState = Immutable({
  detail: {},
  history: [],
  attachments: {},
  groupsForReturn: [],
  groupsForMoreTask: [],

  fetchingHistory: 0,
  fetchingDetail: 0,
  fetchingAttachments: 0,
  fetchingApprove: 0,
  fetchingGroupsForReturn: 0,
  fetchingGroupsForMoreTask: 0
});

export default (state = initialState, action: Action) => {
  const { type } = action;
  const payload: any = getOr({}, 'payload', action);

  switch (type) {
    case types.GET_REQUEST_DETAIL:
      return state.set('fetchingDetail', 1);
    case types.GET_REQUEST_DETAIL_SUCCESS:
      return state.merge({ detail: payload, fetchingDetail: 0 });
    case types.GET_REQUEST_DETAIL_FAILURE:
      return state.set('fetchingDetail', -1);
    case types.GET_REQUEST_DETAIL_CANCEL:
      return state.set('fetchingDetail', 0);

    case types.GET_REQUEST_HISTORY:
      return state.set('fetchingHistory', 1);
    case types.GET_REQUEST_HISTORY_SUCCESS:
      return state.merge({ history: payload, fetchingHistory: 0 });
    case types.GET_REQUEST_HISTORY_FAILURE:
      return state.set('fetchingHistory', -1);
    case types.GET_REQUEST_HISTORY_CANCEL:
      return state.set('fetchingHistory', 0);

    case types.GET_REQUEST_ATTACHMENTS:
      return state.set('fetchingAttachments', 1);
    case types.GET_REQUEST_ATTACHMENTS_SUCCESS:
      return state.merge({ attachments: payload, fetchingAttachments: 0 });
    case types.GET_REQUEST_ATTACHMENTS_FAILURE:
      return state.set('fetchingAttachments', -1);
    case types.GET_REQUEST_ATTACHMENTS_CANCEL:
      return state.set('fetchingAttachments', 0);

    case types.APPROVE_REQUEST:
      return state.set('fetchingApprove', 1);
    case types.APPROVE_REQUEST_SUCCESS:
    case types.APPROVE_REQUEST_CANCEL:
      return state.set('fetchingApprove', 0);
    case types.APPROVE_REQUEST_FAILURE:
      return state.set('fetchingApprove', -1);

    case types.GET_GROUP_FOR_RETURN:
      return state.set('fetchingGroupsForReturn', 1);
    case types.GET_GROUP_FOR_RETURN_SUCCESS:
      return state.merge({ fetchingGroupsForReturn: 0, groupsForReturn: payload });
    case types.GET_GROUP_FOR_RETURN_FAILURE:
      return state.set('fetchingGroupsForReturn', 0);
    case types.GET_GROUP_FOR_RETURN_CANCEL:
      return state.set('fetchingGroupsForReturn', -1);

    case types.GET_GROUP_FOR_MORE_TASK:
      return state.set('fetchingGroupsForMoreTask', 1);
    case types.GET_GROUP_FOR_MORE_TASK_SUCCESS:
      return state.merge({ fetchingGroupsForMoreTask: 0, groupsForMoreTask: payload });
    case types.GET_GROUP_FOR_MORE_TASK_FAILURE:
      return state.set('fetchingGroupsForMoreTask', 0);
    case types.GET_GROUP_FOR_MORE_TASK_CANCEL:
      return state.set('fetchingGroupsForMoreTask', -1);

    case types.CLEAR_REQUEST_DETAIL:
    case 'RESET_APP':
      return initialState;
    default:
      return state;
  }
};

export const selectors = (state: AppState) => {
  return {
    detail: state.requestDetail.getIn(['detail']),
    history: state.requestDetail.getIn(['history']),
    attachments: state.requestDetail.getIn(['attachments']),
    groupsForReturn: state.requestDetail.getIn(['groupsForReturn']),
    groupsForMoreTask: state.requestDetail.getIn(['groupsForMoreTask']),

    fetchingDetail: state.requestDetail.getIn(['fetchingDetail']),
    fetchingHistory: state.requestDetail.getIn(['fetchingHistory']),
    fetchingAttachments: state.requestDetail.getIn(['fetchingAttachments']),
    fetchingApprove: state.requestDetail.getIn(['fetchingApprove']),
    fetchingGroupsForReturn: state.requestDetail.getIn(['fetchingGroupsForReturn']),
    fetchingGroupsForMoreTask: state.requestDetail.getIn(['fetchingGroupsForMoreTask'])
  };
};
