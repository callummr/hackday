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
      template: '' +
        '<form>' +
         '<div ng-repeat="(prop, val) in model" class="form-group">' +
           '<label>{{prop}}</label>' +
           '<!-- text -->' +
           '<input type="text" class="form-control" ng-if="prop===\'age\'" ng-model="model[prop]">' +
           '<!-- end text -->' +
           '<!-- dropdown -->' +
           '<select class="form-control" ng-if="prop!==\'age\'" ng-model="model[prop]">' +
            '<option ng-repeat="optionVal in availableOptions[prop]">{{optionVal}}</option>' +
           '</select>' +
           '<!-- end dropdown -->' +
         '</div>' +
        '</form>' +
        '{{model}}',
      scope: {
        model: '='
      },
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.availableOptions = function() {
          return {
            gender: ['female', 'male']
          }
        }();
      }
    };
  }]);
