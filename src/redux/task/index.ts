import { actions as taskActions, types as taskTypes } from './actions';
import taskEpic from './epic';
import taskReducer, { selectors as taskSelectors } from './reducer';

export { taskActions, taskTypes, taskEpic, taskReducer, taskSelectors };
