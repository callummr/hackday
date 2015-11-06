var eyeMap = {
    "colors": [
        { "name": "blue", "hex": "0000FF" },
        { "name": "yellow", "hex": "FFFF00" },
        { "name": "red", "hex": "FF0000" },
        { "name": "brown", "hex": "6A3A0A" },
        { "name": "blue-gray", "hex": "8F8FFF" },
        { "name": "black", "hex": "000000" },
        { "name": "orange", "hex": "FFA500" },
        { "name": "hazel", "hex": "FFCA23" },
        { "name": "pink", "hex": "FFB2C2" },
        { "name": "unknown", "hex": "FFF3C0" },
        { "name": "red, blue", "hex": "FFB8C7" },
        { "name": "gold", "hex": "FFCA23" },
        { "name": "green}, yellow", "hex": "E0D823" },
        { "name": "white", "hex": "CCCCCC" },
        { "name": "dark", "hex": "524729" }
    ]
}

var hairMap = {
    "colors": [
        { "name": "blond", "hex": "F2DA91" },
        { "name": "n/a", "hex": "997058" },
        { "name": "none", "hex": "373833" },
        { "name": "brown", "hex": "A0522D" },
        { "name": "brown, grey", "hex": "D2B48C" },
        { "name": "black", "hex": "000000" },
        { "name": "auburn, white", "hex": "B08D8D" },
        { "name": "auburn, grey", "hex": "A56A6A" },
        { "name": "white", "hex": "E8E6E6" },
        { "name": "grey", "hex": "A6A4A4" },
        { "name": "auburn", "hex": "A52A2A" },
        { "name": "blonde", "hex": "F2DA91" },
        { "name": "unknown", "hex": "7A7777" }
    ]
}

var skinMap = {
    "colors": [
        { "name": "fair", "hex": "FFE0BD" },
        { "name": "gold", "hex": "FFD700" },
        { "name": "white, blue", "hex": "C2BDFF" },
        { "name": "white", "hex": "FAFAFA" },
        { "name": "light", "hex": "FFEEDB" },
        { "name": "white, red", "hex": "FFBBBB" },
        { "name": "unknown", "hex": "666666" },
        { "name": "green", "hex": "77FF77" },
        { "name": "green-tan, brown", "hex": "CCF179" },
        { "name": "pale", "hex": "FFE8DE" },
        { "name": "metal", "hex": "E3CFC5" },
        { "name": "dark", "hex": "D7B998" },
        { "name": "brown mottle", "hex": "9C856A" },
        { "name": "brown", "hex": "B59369" },
        { "name": "grey", "hex": "AAAAAA" },
        { "name": "mottled green", "hex": "80A16A" },
        { "name": "orange", "hex": "D47B4A" },
        { "name": "blue, grey", "hex": "AFBEE4" },
        { "name": "grey, red", "hex": "F17D6F" },
        { "name": "red", "hex": "FF2222" },
        { "name": "blue", "hex": "2222FF" },
        { "name": "grey, blue", "hex": "A49CF1" },
        { "name": "grey, green, yellow", "hex": "FBE6A1" },
        { "name": "yellow", "hex": "FFF21F" },
        { "name": "tan", "hex": "BA581F" },
        { "name": "fair, green, yellow", "hex": "F3ED30" },
        { "name": "silver, red", "hex": "FF9276" },
        { "name": "green, grey", "hex": "91F2AC" },
        { "name": "red, blue, white", "hex": "F4AACC" },
        { "name": "brown, white", "hex": "B88975" },
        { "name": "none", "hex": "00000A" }
    ]
}

function getClosestSkin(hexFromBetaFace) {
    var skinPoints = [];
    for (var i = 0; i < skinMap.colors.length; i++) {
        skinPoints[i] = getHexProximity(hexFromBetaFace, skinMap.colors[i].hex);
    }
    return skinPoints;
}

function getSkinHex(skinString) {
    if (typeof skinMap[skinString] !== "undefined") {
        return skinMap[skinString];
    } else {
        return false;
    }
}

function getEyeHex(eyeString) {
    if (typeof eyeMap[eyeString] !== "undefined") {
        return eyeMap[eyeString];
    } else {
        return false;
    }
}

function getHexProximity(hex1, hex2) {
    var hex1ArrayString = splitHex(hex1);
    var hex2ArrayString = splitHex(hex2);

    var hex1Array = [hexToInt(hex1ArrayString[0]), hexToInt(hex1ArrayString[1]), hexToInt(hex1ArrayString[2])];
    var hex2Array = [hexToInt(hex2ArrayString[0]), hexToInt(hex2ArrayString[1]), hexToInt(hex2ArrayString[2])];

    var xyz1 = rgbToXyz(hex1Array[0], hex1Array[1], hex1Array[2]);
    var xyz2 = rgbToXyz(hex2Array[0], hex2Array[1], hex2Array[2]);

    var lab1 = xyzToLab(xyz1[0], xyz1[1], xyz1[2]);
    var lab2 = xyzToLab(xyz2[0], xyz2[1], xyz2[2]);

    var diff = cie1994(lab1, lab2, false);

    return diff;
}

function hexToInt(hex) {
    hexString = hex.toString(16);
    return parseInt(hexString, 16);
}

function splitHex(hex) {
    return [
        hex.substr(0, 2),
        hex.substr(2, 2),
        hex.substr(4, 2)
    ];
}

// Convert RGB to XYZ
function rgbToXyz(r, g, b) {
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
function xyzToLab(x, y, z) {
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

function cie1994(x, y, isTextiles) {
    var x = { l: x[0], a: x[1], b: x[2] };
    var y = { l: y[0], a: y[1], b: y[2] };
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

    return Math.sqrt(Math.pow((dl / (kl * sl)), 2) + Math.pow((dc / (kc * sc)), 2) + Math.pow((dh / (kh * sh)), 2));
};

$(document).ready(function () {
    var result = getClosestSkin("FF0000");
    for (var i = 0; i < result.length; i++) {
        $(".test").append(skinMap.colors[i].name + ' - ' + result[i]);
        $(".test").append($("<br />"));
    }
});