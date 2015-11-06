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
      faceData.race = data.race;
      faceData.side = data.smile === "yes" ? 'light' : 'dark';
      faceData.eyeColour = data.colorEyes;
      faceData.eyeColourString = ''; // TODO: Replace with mapped colour
      faceData.skinColour = data.colorSkin;
      faceData.skinColourString = ''; // TODO: Replace with mapped colour
      faceData.hairColour = data.colorHair;
      faceData.hairColourString = ''; // TODO: Replace with mapped colour

      console.log('updated userFace', faceData);
    }

    this.getFaceData = function() {
      return faceData;
    }
  });
