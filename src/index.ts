import { EgeriaLogin } from './components';

import {
  authHeader,
  authHeaderWithContentType,
  currentJwt,
  login,
  logout,
  parseJwt,
  setToken
} from './authentication';

import {
  egeriaFetch,
  handleResponse
} from './commons';

export {
  // components
  EgeriaLogin,

  // authentication
  authHeader,
  authHeaderWithContentType,
  currentJwt,
  login,
  logout,
  parseJwt,
  setToken,

  // commons
  egeriaFetch,
  handleResponse
}
