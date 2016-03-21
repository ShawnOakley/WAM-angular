'use strict';

/**
 * @ngdoc overview
 * @name whackamoleApp
 * @description
 * # whackamoleApp
 *
 * Main module of the application.
 */
angular
  .module('whackamoleApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngMaterial'
    // 'GridSquareFactory'
  ])
  // https://stackoverflow.com/questions/23862119/how-to-make-lodash-work-with-angular-js
    // allow DI for use in controllers, unit tests
  .constant('_', window._)
  // use in views, ng-repeat="x in _.range(3)"
  .run(function ($rootScope) {
     $rootScope._ = window._;
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });