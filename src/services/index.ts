import { create, ApisauceConfig } from 'apisauce';
import { baseURL, ERROR_CODE, TIMEOUT } from '../constants';
import { appAPIs } from './app';
import { userAPIs } from './auth';
import { requestAPIs } from './request';
import { unitsAPIs } from './units';
import { showDialog } from '../emitter';
import { t } from '../i18n';
import { navigate } from '../utils/navigationServices';
import store from '../redux/store';

const apisauceInstance = create({ baseURL, timeout: TIMEOUT });

const fetch = (
  url: string,
  method: 'get' | 'post' | 'patch',
  params?: {} | undefined,
  config?: ApisauceConfig | undefined
): Promise<any> => {
  const request =
    method === 'get'
      ? apisauceInstance.get(url, params, config)
      : method === 'post'
      ? apisauceInstance.post(url, params, config)
      : apisauceInstance.patch(url, params, config);

  return new Promise((resolve, reject) => {
    request
      .then((res: any) => {
        if (__DEV__) {
          console.warn(':::::RESPONSE:::::', res);
        }

        if (res.status === 200 || res.status === 204) {
          resolve(res.data);
        } else {
          const message = !res.status
            ? ERROR_CODE.TIMEOUT
            : res.status === 401
            ? ERROR_CODE.EXPIRED_SECTION
            : res.status === 400
            ? res.data.detail || res.data.title
            : res.data.detail || res.data.title;
          throw { code: res.status || ERROR_CODE.TIMEOUT, message };
        }
      })
      .catch(error => {
        if (error.message === ERROR_CODE.TIMEOUT) {
          showDialog({
            title: 'TIMEOUT',
            content: t('alert.timedOut'),
            buttons: [{ text: 'OK' }]
          });
        } else if (error.code === 401) {
          showDialog({
            title: t('alert.expiredSession'),
            content: t('alert.anotherAccountLoggedIn'),
            buttons: [
              {
                text: 'OK',
                onPress: () => {
                  navigate('Auth');
                  store.dispatch({ type: 'RESET_APP' });
                }
              }
            ]
          });
        }
        reject(error);
      });
  });
};

export { apisauceInstance, fetch, appAPIs, userAPIs, requestAPIs, unitsAPIs };
