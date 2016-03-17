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
    'ngMaterial',
    'Game'
  ])
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
  })
  .controller('GameManager', function(GameManager){
    this.game = GameManager;
  });