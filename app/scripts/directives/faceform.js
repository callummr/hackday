'use strict';

/**
 * @ngdoc directive
 * @name ngSwApp.directive:faceForm
 * @description
 * # faceForm
 */
angular.module('ngSwApp')
  .directive('faceForm', [function () {
    return {
      templateUrl: 'views/directives/faceform.html',
      scope: {
        model: '='
      },
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.availableOptions = {
          gender: ['female', 'male'],
          side: ['dark', 'light']
        }

        var colourFields = ['eyeColour', 'hairColour', 'skinColour'];
        var textFields = ['age'];
        var dropdownFields = ['gender', 'side'];

        scope.isText = function(prop) {
          return textFields.indexOf(prop) > -1;
        }

        scope.isDropdown = function(prop) {
          return dropdownFields.indexOf(prop) > -1;
        }

        scope.isColour = function(prop) {
          return colourFields.indexOf(prop) > -1;
        }
      }
    };
  }]);
