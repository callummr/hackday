'use strict';

describe('Service: colourMapper', function () {

  // load the service's module
  beforeEach(module('ngSwApp'));

  // instantiate service
  var colourMapper;
  beforeEach(inject(function (_colourMapper_) {
    colourMapper = _colourMapper_;
  }));

  it('should do something', function () {
    expect(!!colourMapper).toBe(true);
  });

});
