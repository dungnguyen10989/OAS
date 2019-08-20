import { of } from 'rxjs';
import { ofType, ActionsObservable } from 'redux-observable';
import { map, takeUntil, catchError, switchMap } from 'rxjs/operators';
import { combineEpics } from 'redux-observable';
import { Action } from 'c-redux';
import { types, actions } from './actions';
import { appAPIs } from '../../services';

const fetchAppVersion = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(types.GET_VERSION),
    switchMap(action => {
      return appAPIs.getVersion().pipe(
        map(response => {
          return actions.getVersionSuccess(response);
        }),
        takeUntil(action$.pipe(ofType(types.GET_VERSION_CANCEL))),
        catchError(error => {
          return of({
            type: types.GET_VERSION_FAILURE,
            payload: error.response.title
          });
        })
      );
    })
  );

export default combineEpics(fetchAppVersion);
