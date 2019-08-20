import { baseURL } from '../constants';
import { fetch } from '.';

const appAPIs = {
  login: (username: string, password: string) =>
    fetch('users/authenticate', 'post', JSON.stringify({ username, password }), {
      headers: { 'Content-Type': 'application/json-patch+json' },
      baseURL
    })
};

export { appAPIs };
