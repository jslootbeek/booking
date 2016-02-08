angular.module('firebase.config', [])
  .constant('FBURL', 'https://blazing-heat-2476.firebaseio.com/')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['password'])

  .constant('loginRedirectPath', '/login');
