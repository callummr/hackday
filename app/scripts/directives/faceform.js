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

        scope.isText = function(prop) {
          return ['gender', 'side'].indexOf(prop);
        }

        scope.isDropdown = function(prop) {
          return ['gender', 'side'].indexOf(prop) > -1;
        }

        scope.isColour = function(prop) {
          return prop !== 'age' && ['gender', 'side'].indexOf(prop) === -1;
        }
      }
    };
  }]);
