import { setToken } from './set-token';
export function login(username, password) {
    const requestOptions = {
        method: 'POST',
        body: new URLSearchParams(`username=${username}&password=${password}`)
    };
    return fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, requestOptions)
        .then((response) => {
        if (response.ok) {
            const token = response.headers.get('x-auth-token');
            setToken(token);
            console.log("LOGGED IN");
        }
        return response;
    });
}
