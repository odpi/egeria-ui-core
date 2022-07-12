export const logout = (logoutCallback) => {
    localStorage.removeItem('currentJwt');
    console.log('LOGGED OUT');
    logoutCallback ? logoutCallback() : 0;
};
