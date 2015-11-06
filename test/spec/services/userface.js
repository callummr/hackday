'use strict';

describe('Service: userFace', function () {

  // load the service's module
  beforeEach(module('ngSwApp'));

  // instantiate service
  var userFace;
  beforeEach(inject(function (_userFace_) {
    userFace = _userFace_;
  }));

  it('should do something', function () {
    expect(!!userFace).toBe(true);
  });

});
