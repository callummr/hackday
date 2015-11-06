'use strict';

/**
 * @ngdoc function
 * @name ngSwApp.controller:SwapitestCtrl
 * @description
 * # SwapitestCtrl
 * Controller of the ngSwApp
 */
angular.module('ngSwApp')
  .controller('SwapitestCtrl', ['swapi', function (swapi) {
    var self = this;
    swapi.people.all().then(function(people) {
      self.people = people;
    })
  }]);
