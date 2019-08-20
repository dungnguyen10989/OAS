import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import { debuggerConfig, Reactotron } from '../configs';
import epics from './epics';
import reducers from './reducers';

const epicMiddleware = createEpicMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// prefer use Otron debug instead DebuggerOpen or ChromeDebugger
const _compose =
  debuggerConfig.provider === 'otron' && typeof Reactotron.createEnhancer === 'function'
    ? compose(
        applyMiddleware(epicMiddleware),
        Reactotron.createEnhancer()
      )
    : composeEnhancers(applyMiddleware(epicMiddleware));

const store = createStore(reducers, _compose);

epicMiddleware.run(epics);

export default store;
