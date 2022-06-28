export function logout() {
  localStorage.removeItem('currentJwt');

  console.log('LOGGED OUT');
}
