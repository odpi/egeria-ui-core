import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate } from 'react-router-dom';
import { currentJwt } from '../../authentication/current-jwt';
export function RequireAuth(props) {
    const { children } = props;
    const _currentJwt = currentJwt();
    if (_currentJwt) {
        return children;
    }
    else {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
}
