import { of, from } from 'rxjs';
import { ofType, ActionsObservable } from 'redux-observable';
import { takeUntil, catchError, switchMap } from 'rxjs/operators';
import { combineEpics } from 'redux-observable';
import { Action } from 'c-redux';
import { types, actions } from './actions';
import { requestAPIs } from '../../services';

const getOpeningRequestEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(types.GET_OPENING_REQUEST),
    switchMap(action => {
      return from(requestAPIs.getOpeningRequest(action.payload)).pipe(
        switchMap(data => {
          return of(
            actions.getOpeningRequestSuccess({ pageNumber: action.payload.pageNumber, data })
          );
        }),
        takeUntil(action$.pipe(ofType(types.GET_OPENING_REQUEST_CANCEL))),
        catchError(error => {
          return of(actions.getOpeningRequestFailure(error.message));
        })
      );
    })
  );

const editOpeningRequestEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(types.EDIT_OPENING_REQUEST),
    switchMap(action => {
      return from(requestAPIs.getOpeningRequest(action.payload)).pipe(
        switchMap(data => {
          return of(actions.editOpeningRequestSuccess(data));
        }),
        takeUntil(action$.pipe(ofType(types.EDIT_OPENING_REQUEST_CANCEL))),
        catchError(error => {
          return of(actions.editOpeningRequestFailure(error.message));
        })
      );
    })
  );

export default combineEpics(getOpeningRequestEpic, editOpeningRequestEpic);
