'use strict';

/**
 * @ngdoc service
 * @name ngSwApp.userFace
 * @description
 * # userFace
 * Service in the ngSwApp.
 */
angular.module('ngSwApp')
  .service('userFace', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var faceData = {};
    this.setFaceData = function(data) {
      faceData.age = data.age;
      faceData.gender = data.gender;
      faceData.race = data.race; // TODO: Replace with mapped colour
      faceData.side = data.smile === "yes" ? 'light' : 'dark';
      faceData.eyeColour = data.colorEyes; // TODO: Replace with mapped colour
      faceData.skinColour = data.colorSkin;
      faceData.hairColour = data.hairColorType.split(' ')[0]; // second is usually "light|dark"
      // TODO: replace ^ with mapped colour
      // TODO: possibly use light/dark in mapping hair colour

      console.log('updated userFace', faceData);
    }

    this.getFaceData = function() {
      return faceData;
    }
  });
