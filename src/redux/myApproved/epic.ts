import { of, from } from 'rxjs';
import { ofType, ActionsObservable } from 'redux-observable';
import { takeUntil, catchError, switchMap } from 'rxjs/operators';
import { combineEpics } from 'redux-observable';
import { Action } from 'c-redux';
import { types, actions } from './actions';
import { requestAPIs } from '../../services';

const getMyApproveEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(types.GET_MY_APPROVED),
    switchMap(action => {
      return from(requestAPIs.getTask(action.payload)).pipe(
        switchMap(data => {
          return of(actions.getMyApprovedSuccess({ pageNumber: action.payload.pageNumber, data }));
        }),
        takeUntil(action$.pipe(ofType(types.GET_MY_APPROVED_CANCEL))),
        catchError(error => {
          return of(actions.getMyApprovedFailure(error.message));
        })
      );
    })
  );

export default combineEpics(getMyApproveEpic);
