import { FetchingStatus } from 'c-redux';
import { fetch } from '.';
import { PAGE_SIZE } from '../constants';

interface Params {
  type?: string;
  isOverDeadline?: boolean;
  status?: FetchingStatus;
  pageNumber?: number;
  pageSize?: number;
}

const requestAPIs = {
  getMyApproved: (params: Params) => {
    const _params = Object.assign({ pageSize: PAGE_SIZE }, params);
    return fetch('su/approval-requests', 'get', _params);
  }
};

export { requestAPIs };
