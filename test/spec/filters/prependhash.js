'use strict';

describe('Filter: prependHash', function () {

  // load the filter's module
  beforeEach(module('ngSwApp'));

  // initialize a new instance of the filter before each test
  var prependHash;
  beforeEach(inject(function ($filter) {
    prependHash = $filter('prependHash');
  }));

  it('should return the input prefixed with "prependHash filter:"', function () {
    var text = 'angularjs';
    expect(prependHash(text)).toBe('prependHash filter: ' + text);
  });

});
