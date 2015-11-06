'use strict';

/**
 * @ngdoc directive
 * @name ngSwApp.directive:hexCode
 * @description
 * # hexCode
 */
angular.module('ngSwApp')
  .directive('hexcode', function () {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        ngModel.$formatters.push(function(val){
          return '#' + val
        });
        ngModel.$parsers.push(function(val){
          return val.replace(/^\#/, '')
        });
      }
    };
  });
