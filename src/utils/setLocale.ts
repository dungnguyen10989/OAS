import Numeral from 'numeral';
import 'numeral/locales';
import moment from 'moment';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';

import { storageKeys } from '../constants';
import I18n from '../i18n';
import { apisauceInstance } from '../services';

export const setLocale = (locale: string) => {
  I18n.locale = locale;
  Numeral.locale(locale);
  // moment.locale(locale);

  const headerLanguage = locale === 'vi' ? 'vi-VN' : 'en-US';

  apisauceInstance.setHeader('Accept-Language', headerLanguage);
  RNSecureStorage.set(storageKeys.locale, locale, { accessible: ACCESSIBLE.ALWAYS });
};
