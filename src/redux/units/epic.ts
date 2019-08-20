import { of, from } from 'rxjs';
import { Action } from 'redux';
import { ofType, ActionsObservable } from 'redux-observable';
import { map, takeUntil, catchError, switchMap } from 'rxjs/operators';
import { combineEpics } from 'redux-observable';
import OneSignal from 'react-native-onesignal';

import { types, actions } from './actions';

import { unitsAPIs } from '../../services';
import { navigate } from '../../utils/navigationServices';
import { NavigationActions } from 'react-navigation';
import { routes } from '../../containers';
import { AppState } from 'c-redux';
import { authSelectors } from '../auth';

const getUnitsEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(types.GET_UNITS),
    switchMap(action => {
      return from(unitsAPIs.getUnits()).pipe(
        switchMap(data => {
          return of(actions.getUnitsSuccess(data));
        }),
        takeUntil(action$.pipe(ofType(types.GET_UNITS_CANCEL))),
        catchError(error => {
          return of(actions.getUnitsFailure(error.message));
        })
      );
    })
  );

const switchEpic = (action$: ActionsObservable<Action>, state$: any) =>
  action$.pipe(
    ofType(types.GET_UNITS_SUCCESS),
    map(() => {
      navigate('App');
      const id = state$.value.auth.data.id;
      OneSignal.sendTag('id', id);
      return { type: 'SWITCH_ROOT' };
    })
  );

export default combineEpics(getUnitsEpic, switchEpic);
