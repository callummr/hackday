'use strict';

describe('Directive: faceForm', function () {

  // load the directive's module
  beforeEach(module('ngSwApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<face-form></face-form>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the faceForm directive');
  }));
});
