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
      faceData.side = data.smile === 'yes' ? 'light' : 'dark';
      faceData.eyeColour = data.colorEyes;
      faceData.skinColour = data.colorSkin;
      faceData.hairColour = data.colorHair;

      console.log('updated userFace', faceData);
    }

    this.setFaceDataNormalized = function(data) {
      // kinda dangerous
      faceData = data;
    }

    this.getFaceData = function() {
      return faceData;
    }

    this.getEmptyModel = function() {
      return {
        age: '',
        gender: '',
        side: '',
        eyeColour: '',
        skinColour: '',
        hairColour: ''
      }
    }
  });
