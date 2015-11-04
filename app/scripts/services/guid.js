'use strict';

/**
 * @ngdoc service
 * @name ngSwApp.guid
 * @description
 * # guid
 * Service in the ngSwApp.
 */
angular.module('ngSwApp')
  .service('guid', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.generate = function() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    };
  });
