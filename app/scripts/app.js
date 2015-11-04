'use strict';

/**
 * @ngdoc overview
 * @name ngSwApp
 * @description
 * # ngSwApp
 *
 * Main module of the application.
 */
angular
  .module('ngSwApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'toastr'
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
      .when('/faceSettings/:uid?', {
        templateUrl: 'views/facesettings.html',
        controller: 'FacesettingsCtrl',
        controllerAs: 'faceSettings'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
