require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');
var angular = window.angular;

var snackTrackApp = angular.module('SnackTrackApp', ['ngRoute', 'ngCookies', 'base64']);

require('./directives/directives')(snackTrackApp);
require('./filters/filters')(snackTrackApp);
require('./services/services')(snackTrackApp);

require('./snacks/snacks')(snackTrackApp);
require('./auth/auth')(snackTrackApp);

snackTrackApp.config(['$routeProvider', function($route) {
  $route
    .when('/snacks', {
      templateUrl: '/templates/snacks_view.html',
      controller: 'SnacksController'
    })
    .when('/signup', {
      templateUrl: '/templates/auth_view.html',
      controller: 'SignupController'
    })
    .when('/signin', {
      templateUrl: '/templates/auth_view.html',
      controller: 'SigninController'
    })
    .when('/allsnacks', {
      templateUrl: '/templates/all_snacks.html',
      controller: 'AllSnacksController'
    })
    .otherwise({
      redirectTo: '/signup'
    })
}]);
