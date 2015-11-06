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
    self.ready = false;
    
    swapi.people.all().then(function(people) {
      self.people = people;
      self.ready = true;
    })
  }]);
