import {
  Navigate
} from 'react-router-dom';

import { token } from '@lfai/egeria-js-commons';

export function RequireAuth(props: any) {
  const { children } = props;

  const _token = token.getValue();

  if (_token) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
}
