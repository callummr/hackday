'use strict';

/**
 * @ngdoc function
 * @name ngSwApp.controller:ProcessingCtrl
 * @description
 * # ProcessingCtrl
 * Controller of the ngSwApp
 */
angular.module('ngSwApp')
  .controller('ProcessingCtrl', ['$location', 'swapi', 'userFace', 'patryksMagic', function ($location, swapi, userFace, patryksMagic) {
    var self = this;
    var fd = userFace.getFaceData();

    self.processing = true;

    swapi.people.all().then(function(people) {
      self.swapiData = people;
      console.log(people);

      var result = patryksMagic.getParent(fd.hairColour, fd.skinColour, fd.eyeColour, fd.age, fd.side, fd.gender, people.results);

      self.resultText = result.name + " is your father";
      self.processing = false;
    });
  }]);
