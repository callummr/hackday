'use strict';

describe('Controller: ProcessingCtrl', function () {

  // load the controller's module
  beforeEach(module('ngSwApp'));

  var ProcessingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProcessingCtrl = $controller('ProcessingCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProcessingCtrl.awesomeThings.length).toBe(3);
  });
});
