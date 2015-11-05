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
      template: '<div ng-repeat="(prop, val) in model"><p>{{prop}}: {{val}}</p></div>',
      scope: {
        model: '='
      },
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

      }
    };
  }]);
