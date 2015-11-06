'use strict';

describe('Directive: hexCode', function () {

  // load the directive's module
  beforeEach(module('ngSwApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<hex-code></hex-code>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the hexCode directive');
  }));
});
