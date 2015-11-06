'use strict';

describe('Controller: SwapitestCtrl', function () {

  // load the controller's module
  beforeEach(module('ngSwApp'));

  var SwapitestCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SwapitestCtrl = $controller('SwapitestCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SwapitestCtrl.awesomeThings.length).toBe(3);
  });
});
