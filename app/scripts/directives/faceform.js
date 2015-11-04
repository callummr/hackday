'use strict';

/**
 * @ngdoc directive
 * @name ngSwApp.directive:faceForm
 * @description
 * # faceForm
 */
angular.module('ngSwApp')
  .directive('faceForm', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the faceForm directive');
      }
    };
  });
