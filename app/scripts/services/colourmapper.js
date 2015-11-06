'use strict';

/**
 * @ngdoc service
 * @name ngSwApp.colourMapper
 * @description
 * # colourMapper
 * Service in the ngSwApp.
 */
angular.module('ngSwApp')
  .service('colourMapper', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var eyeMap = {
      // delete this one when we have ctual data
      "blue": "0000FF"
    }

    var skinMap = {
      "fair": "FFE0BD",
      "gold": "FFD700",
      "white, blue": "C2BDFF",
      "white": "FAFAFA",
      "light": "FFEEDB",
      "white, red": "FFBBBB",
      "unknown": "666666",
      "green": "77FF77",
      "green-tan, brown": "CCF179",
      "pale": "FFE8DE",
      "metal": "E3CFC5",
      "dark": "D7B998",
      "brown mottle": "9C856A",
      "brown": "B59369",
      "grey": "AAAAAA",
      "mottled green": "80A16A",
      "orange": "D47B4A",
      "blue, grey": "AFBEE4",
      "grey, red": "F17D6F",
      "red": "FF2222",
      "blue": "2222FF",
      "grey, blue": "A49CF1",
      "grey, green, yellow": "FBE6A1",
      "yellow": "FFF21F",
      "tan": "BA581F",
      "fair, green, yellow": "F3ED30",
      "silver, red": "FF9276",
      "green, grey": "91F2AC",
      "red, blue, white": "F4AACC",
      "brown, white": "B88975",
      "none": "000000",
    }

    this.getSkinHex = function(skinString) {
      if (typeof skinMap[skinString] !== "undefined") {
        return skinMap[skinString];
      } else {
        return false;
      }
    }

    this.getEyeHex = function(eyeString) {
      if (typeof eyeMap[eyeString] !== "undefined") {
        return eyeMap[eyeString];
      } else {
        return false;
      }
    }

    this.getHexProximity = function(hex1, hex2) {
      var hex1Array = splitHex(hex1);
      var hex2Array = splitHex(hex2);


      // should return some sort of rating of
      // how close two hex codes are
      // how the fuck do you measure that
    }

    function hexToIntArray()

    function hexToInt(hex) {


    }

    function splitHex(hex) {
      return [
        hex.substr(0,2),
        hex.substr(2,2),
        hex.substr(4,2)
      ];
    }

  });
