import { dims } from './dimensions';
import { colors } from './colors';
import storageKeys from './storageKeys';
import * as business from './business';

const defaultLanguage = 'vi';
const uriPrefix = '/oaa';
const TIMEOUT = 60000;
const baseURL = 'https://oas-api.azurewebsites.net/api/';

const ERROR_CODE = {
  EXPIRED_SECTION: 'EXPIRED_SECTION',
  TIMEOUT: 'TIMEOUT'
};

const PAGE_SIZE = 10;

export {
  defaultLanguage,
  dims,
  colors,
  storageKeys,
  uriPrefix,
  business,
  TIMEOUT,
  baseURL,
  ERROR_CODE,
  PAGE_SIZE
};
