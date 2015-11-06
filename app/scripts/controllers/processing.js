'use strict';

/**
 * @ngdoc function
 * @name ngSwApp.controller:ProcessingCtrl
 * @description
 * # ProcessingCtrl
 * Controller of the ngSwApp
 */
angular.module('ngSwApp')
  .controller('ProcessingCtrl', ['$location', 'swapi', 'userFace', function ($location, swapi, userFace) {
    var self = this;

    self.userFace = userFace.getFaceData();
    self.processing = true;

    swapi.people.all().then(function(people) {
      self.swapiData = people;
      console.log(people);

      self.resultText = "I am your father";
      self.processing = false;
    });
  }]);
