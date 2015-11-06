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
           '<input type="text" class="form-control" ng-if="[\'gender\', \'side\'].indexOf(prop) === -1" ng-model="model[prop]">' +
           '<!-- <color-picker ng-if="prop !== \'age\' && [\'gender\', \'side\'].indexOf(prop) === -1" ng-model="model[prop]" color-picker-format="hex"></color-picker> -->' +
           '<!-- end text -->' +
           '<!-- dropdown -->' +
           '<select class="form-control" ng-if="[\'gender\', \'side\'].indexOf(prop) > -1" ng-model="model[prop]">' +
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
            gender: ['female', 'male'],
            side: ['dark', 'light']
          }
        }();
      }
    };
  }]);
