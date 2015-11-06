'use strict';

/**
 * @ngdoc service
 * @name ngSwApp.colourMapper
 * @description
 * # colourMapper
 * Service in the ngSwApp.
 */
angular.module('ngSwApp')
    .service('colourMapper', function() {
        // AngularJS will instantiate a singleton by calling "new" on this function


        var eyeMap = {
            "blue": "0000FF",
            "yellow": "FFFF00",
            "red": "FF0000",
            "brown": "6A3A0A",
            "blue-gray": "8F8FFF",
            "black": "000000",
            "orange": "FFA500",
            "hazel": "FFCA23",
            "pink": "FFB2C2",
            "unknown": "FFF3C0",
            "red, blue": "FFB8C7",
            "gold": "FFCA23",
            "green, yellow": "E0D823",
            "white": "CCCCCC",
            "dark": "524729"
        }

        var hairMap = {
            "blond": "F2DA91",
            "n/a": "997058",
            "none": "373833",
            "brown": "A0522D",
            "brown, grey": "D2B48C",
            "black": "000000",
            "auburn, white": "B08D8D",
            "auburn, grey": "A56A6A",
            "white": "E8E6E6",
            "grey": "A6A4A4",
            "auburn": "A52A2A",
            "blonde": "F2DA91",
            "unknown": "7A7777"
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
            "none": "000000"
        }

        this.getClosestSkin = function(hexFromBetaFace) {

            var skinPoints = [];
            for (var i = 0; i < skinMap.length; i++) {
                skinPoints[i] = this.getHexProximity(hexFromBetaFace, skinMap[i]);
            }
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

            var xyz1 = rgbToXyz(hex1Array[0], hex1Array[1], hex1Array[2]);
            var xyz2 = rgbToXyz(hex2Array[0], hex2Array[1], hex2Array[2]);

            var lab1 = xyzToLab(xyz1[0], xyz1[1], xyz1[2]);
            var lab2 = xyzToLab(xyz2[0], xyz2[1], xyz2[2]);

            var diff = cie1994(lab1, lab2, false);

            return diff;
        }

        this.hexToInt = function(hex) {
            hexString = hex.toString(16);
            return parseInt(hexString, 16);
        }

        this.splitHex = function(hex) {
            return [
                hex.substr(0, 2),
                hex.substr(2, 2),
                hex.substr(4, 2)
            ];
        }

        // Convert RGB to XYZ
        this.rgbToXyz = function(r, g, b) {
            var _r = (r / 255);
            var _g = (g / 255);
            var _b = (b / 255);

            if (_r > 0.04045) {
                _r = Math.pow(((_r + 0.055) / 1.055), 2.4);
            } else {
                _r = _r / 12.92;
            }

            if (_g > 0.04045) {
                _g = Math.pow(((_g + 0.055) / 1.055), 2.4);
            } else {
                _g = _g / 12.92;
            }

            if (_b > 0.04045) {
                _b = Math.pow(((_b + 0.055) / 1.055), 2.4);
            } else {
                _b = _b / 12.92;
            }

            _r = _r * 100;
            _g = _g * 100;
            _b = _b * 100;

            X = _r * 0.4124 + _g * 0.3576 + _b * 0.1805;
            Y = _r * 0.2126 + _g * 0.7152 + _b * 0.0722;
            Z = _r * 0.0193 + _g * 0.1192 + _b * 0.9505;

            return [X, Y, Z];
        };


        // Convert XYZ to LAB
        this.xyzToLab = new function(x, y, z) {
            var ref_X = 95.047;
            var ref_Y = 100.000;
            var ref_Z = 108.883;

            var _X = x / ref_X;
            var _Y = y / ref_Y;
            var _Z = z / ref_Z;

            if (_X > 0.008856) {
                _X = Math.pow(_X, (1 / 3));
            } else {
                _X = (7.787 * _X) + (16 / 116);
            }

            if (_Y > 0.008856) {
                _Y = Math.pow(_Y, (1 / 3));
            } else {
                _Y = (7.787 * _Y) + (16 / 116);
            }

            if (_Z > 0.008856) {
                _Z = Math.pow(_Z, (1 / 3));
            } else {
                _Z = (7.787 * _Z) + (16 / 116);
            }

            var CIE_L = (116 * _Y) - 16;
            var CIE_a = 500 * (_X - _Y);
            var CIE_b = 200 * (_Y - _Z);

            return [CIE_L, CIE_a, CIE_b];
        };

        this.cie1994 = function(x, y, isTextiles) {
            var x = {l: x[0], a: x[1], b: x[2]};
            var y = {l: y[0], a: y[1], b: y[2]};
            labx = x;
            laby = y;
            var k2;
            var k1;
            var kl;
            var kh = 1;
            var kc = 1;
            if (isTextiles) {
                k2 = 0.014;
                k1 = 0.048;
                kl = 2;
            }
            else {
                k2 = 0.015;
                k1 = 0.045;
                kl = 1;
            }
 
            var c1 = Math.sqrt(x.a * x.a + x.b * x.b);
            var c2 = Math.sqrt(y.a * y.a + y.b * y.b);
 
            var sh = 1 + k2 * c1;
            var sc = 1 + k1 * c1;
            var sl = 1;
 
            var da = x.a - y.a;
            var db = x.b - y.b;
            var dc = c1 - c2;
 
            var dl = x.l - y.l;
            var dh = Math.sqrt(da * da + db * db - dc * dc);
 
            return Math.sqrt(Math.pow((dl/(kl * sl)),2) + Math.pow((dc/(kc * sc)),2) + Math.pow((dh/(kh * sh)),2));
        };

    });