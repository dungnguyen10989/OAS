import { FetchingStatus } from 'c-redux';
import { fetch } from '.';
import { PAGE_SIZE } from '../constants';
import { baseURL } from '../constants';

interface Params {
  type?: string;
  isOverDeadline?: boolean;
  status?: FetchingStatus;
  pageNumber?: number;
  pageSize?: number;
}

const requestAPIs = {
  getTask: (params: Params) => {
    const _params = Object.assign({ pageSize: PAGE_SIZE }, params);
    return fetch('su/approval-requests', 'get', _params);
  },

  getOpeningRequest: (params: Params) => {
    const _params = Object.assign({ pageSize: PAGE_SIZE }, params, { status: 'Open' });
    return fetch('su/requests', 'get', _params);
  },

  myApproved: (params: Params) => {
    const _params = Object.assign({ pageSize: PAGE_SIZE }, params);
    return fetch('su/approved-requests', 'get', _params);
  },

  getDetail: (params: { type: string; id: string }) =>
    fetch(`su/approval-requests/${params.type}/${params.id}`, 'get', params),

  getHistory: (params: { type: string; id: string }) =>
    fetch(`su/approval-requests/${params.type}/${params.id}/history`, 'get', params),

  getAttach: (params: { type: string; id: string }) =>
    fetch(`su/approval-requests/${params.type}/${params.id}/attachmentss`, 'get', params),

  approve: (params: any) =>
    fetch(`su/approval-requests/approve`, 'patch', params, {
      headers: { Accept: 'application/json-patch+json' },
      baseURL
    }),

  getGroupForReturn: (params: any) =>
    fetch(`su/approval-requests/return-groups/${params.requestListCode}`, 'get'),

  getGroupForMoreTask: () => fetch(`su/approval-group`, 'get')
};

export { requestAPIs };
