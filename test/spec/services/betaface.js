'use strict';

describe('Service: betaface', function () {

  // load the service's module
  beforeEach(module('ngSwApp'));

  // instantiate service
  var betaface;
  beforeEach(inject(function (_betaface_) {
    betaface = _betaface_;
  }));

  it('should do something', function () {
    expect(!!betaface).toBe(true);
  });

});
