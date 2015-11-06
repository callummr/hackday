'use strict';

describe('Service: patryksMagic', function () {

  // load the service's module
  beforeEach(module('ngSwApp'));

  // instantiate service
  var patryksMagic;
  beforeEach(inject(function (_patryksMagic_) {
    patryksMagic = _patryksMagic_;
  }));

  it('should do something', function () {
    expect(!!patryksMagic).toBe(true);
  });

});
