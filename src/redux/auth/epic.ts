import { of, from } from 'rxjs';
import { ofType, ActionsObservable } from 'redux-observable';
import { takeUntil, catchError, switchMap } from 'rxjs/operators';
import { combineEpics } from 'redux-observable';
import { Action } from 'c-redux';
import { types, actions } from './actions';
import { unitsActions } from '../units';
import { userAPIs } from '../../services';
import { apisauceInstance } from '../../services';
import { showDialog } from '../../emitter';

const loginEpic = (action$: ActionsObservable<Action>) => {
  return action$.pipe(
    ofType(types.LOGIN),
    switchMap(action => {
      const { username, password } = action.payload;
      return from(userAPIs.login(username, password)).pipe(
        switchMap(data => {
          apisauceInstance.setHeader('Authorization', `Bearer ${data.token}`);
          return of(unitsActions.getUnits(), actions.loginSuccess(data));
        }),
        takeUntil(action$.pipe(ofType(types.LOGIN_CANCEL))),
        catchError(error => {
          showDialog({
            buttons: [{ text: 'OK' }],
            content: error.message,
            title: 'Login error'
          });
          return of(actions.loginFailure(error.message));
        })
      );
    })
  );
};

export default combineEpics(loginEpic);
