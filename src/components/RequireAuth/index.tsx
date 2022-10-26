import {
  Navigate
} from 'react-router-dom';

import { currentJwt } from '@lfai/egeria-js-commons';

export function RequireAuth(props: any) {
  const { children } = props;

  const _currentJwt = currentJwt();

  if (_currentJwt) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
}
