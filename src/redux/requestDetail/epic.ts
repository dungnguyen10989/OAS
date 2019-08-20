import { of, from } from 'rxjs';
import { ofType, ActionsObservable } from 'redux-observable';
import { takeUntil, catchError, switchMap } from 'rxjs/operators';
import { combineEpics } from 'redux-observable';
import { Action } from 'c-redux';
import { types, actions } from './actions';
import { requestAPIs } from '../../services';

const getRequestDetailEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(types.GET_REQUEST_DETAIL),
    switchMap(action => {
      return from(requestAPIs.getDetail(action.payload)).pipe(
        switchMap(data => {
          return of(actions.getRequestDetailSuccess(data));
        }),
        takeUntil(action$.pipe(ofType(types.GET_REQUEST_DETAIL_CANCEL))),
        catchError(error => {
          return of(actions.getRequestDetailFailure(error.message));
        })
      );
    })
  );

const updateRequestDetailEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(types.UPDATE_REQUEST_DETAIL),
    switchMap(action => {
      return from(requestAPIs.getDetail(action.payload)).pipe(
        switchMap(data => {
          return of(actions.updateRequestDetailSuccess(data));
        }),
        takeUntil(action$.pipe(ofType(types.UPDATE_REQUEST_DETAIL_CANCEL))),
        catchError(error => {
          return of(actions.updateRequestDetailFailure(error.message));
        })
      );
    })
  );

const getRequestHistoryEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(types.GET_REQUEST_HISTORY),
    switchMap(action => {
      return from(requestAPIs.getHistory(action.payload)).pipe(
        switchMap(data => {
          return of(actions.getRequestHistorySuccess(data));
        }),
        takeUntil(action$.pipe(ofType(types.GET_REQUEST_HISTORY_CANCEL))),
        catchError(error => {
          return of(actions.getRequestHistoryFailure(error.message));
        })
      );
    })
  );

const getRequestAttachmentsEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(types.GET_REQUEST_ATTACHMENTS),
    switchMap(action => {
      return from(requestAPIs.getAttach(action.payload)).pipe(
        switchMap(data => {
          return of(actions.getRequestAttachmentsSuccess(data));
        }),
        takeUntil(action$.pipe(ofType(types.GET_REQUEST_ATTACHMENTS_CANCEL))),
        catchError(error => {
          return of(actions.getRequestAttachmentsFailure(error.message));
        })
      );
    })
  );

const approveRequestEpic = (action$: ActionsObservable<Action>, state$: any) =>
  action$.pipe(
    ofType(types.APPROVE_REQUEST),
    switchMap(action => {
      const { payload } = action;
      const { onSuccess, onError } = payload;
      delete payload.onSuccess;
      delete payload.onError;

      return from(requestAPIs.approve(action.payload)).pipe(
        switchMap(data => {
          if (typeof onSuccess === 'function') {
            onSuccess();
          }

          const item = state$.value.task.data.find((i: any) => i.id === payload.id);
          return of(actions.approveRequestSuccess(item));
        }),
        takeUntil(action$.pipe(ofType(types.APPROVE_REQUEST_CANCEL))),
        catchError(error => {
          if (typeof onError === 'function') {
            onError(error.message);
          }
          return of(actions.approveRequestFailure(error.message));
        })
      );
    })
  );

const getGroupForReturnEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(types.GET_GROUP_FOR_RETURN),
    switchMap(action => {
      return from(requestAPIs.getGroupForReturn(action.payload)).pipe(
        switchMap(data => {
          return of(actions.getGroupForReturnSuccess(data));
        }),
        takeUntil(action$.pipe(ofType(types.GET_GROUP_FOR_RETURN_CANCEL))),
        catchError(error => {
          return of(actions.getGroupForReturnFailure(error.message));
        })
      );
    })
  );

const getGroupForMoreTaskEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(types.GET_GROUP_FOR_MORE_TASK),
    switchMap(action => {
      return from(requestAPIs.getGroupForMoreTask()).pipe(
        switchMap(data => {
          return of(actions.getGroupForMoreTaskSuccess(data));
        }),
        takeUntil(action$.pipe(ofType(types.GET_GROUP_FOR_MORE_TASK_CANCEL))),
        catchError(error => {
          return of(actions.getGroupForMoreTaskFailure(error.message));
        })
      );
    })
  );

export default combineEpics(
  getRequestDetailEpic,
  getRequestHistoryEpic,
  updateRequestDetailEpic,
  getRequestAttachmentsEpic,
  approveRequestEpic,
  getGroupForReturnEpic,
  getGroupForMoreTaskEpic
);
