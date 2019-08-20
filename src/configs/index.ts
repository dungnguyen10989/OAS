import Reactotron, { trackGlobalErrors, openInEditor, networking } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

import name from '../../app.json';

interface IDebuggerConfig {
  provider: 'otron' | 'open-debugger';
  // the options below only work with provider=otron
  host?: string;
  port?: number;
}

const debuggerConfig: IDebuggerConfig = {
  provider: 'open-debugger',
  host: 'localhost', // change to your IP Address of your computer to debug in release mode
  port: 9090
};

Reactotron.configure({ host: debuggerConfig.host, port: debuggerConfig.port })
  .useReactNative({
    asyncStorage: true, // there are more options to the async storage.
    networking: {
      // optionally, you can turn it off with false.
      ignoreUrls: /symbolicate/
    },
    editor: true, // there are more options to editor
    errors: { veto: () => false }, // or turn it off with false
    overlay: true // just turning off overlay
  })
  .use(trackGlobalErrors({}))
  .use(openInEditor())
  .use(networking())
  .use(reactotronRedux());

if (debuggerConfig.provider === 'otron') {
  Reactotron.connect();

  const yeOldeConsoleLog = console.log;
  // const yeOldeConsoleWarn = console.warn;
  const yeOldeConsoleError = console.error;
  const yeOldeConsoleException = console.exception;

  const display = (msg: string, args: any) => {
    Reactotron.display({
      name: `${name.name}.${msg}`,
      value: args,
      preview: args.length > 0 && typeof args[0] === 'string' ? args[0] : null
    });
  };

  console.log = (...args: any) => {
    yeOldeConsoleLog(...args);
    display('LOG', args);
  };

  // console.warn = (...args: any) => {
  //   yeOldeConsoleWarn(...args);
  //   display('WARN', args);
  // };

  console.error = (...args: any) => {
    yeOldeConsoleError(...args);
    display('ERROR', args);
  };

  console.exception = (...args) => {
    yeOldeConsoleException(...args);
    display('EXCEPTION', args);
  };
}

export { Reactotron, debuggerConfig };
