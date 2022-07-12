export function logout(logoutCallback?: Function) {
  localStorage.removeItem('currentJwt');

  console.log('LOGGED OUT');

  logoutCallback ? logoutCallback() : 0;
}
