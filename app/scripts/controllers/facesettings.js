'use strict';

/**
 * @ngdoc function
 * @name ngSwApp.controller:FacesettingsCtrl
 * @description
 * # FacesettingsCtrl
 * Controller of the ngSwApp
 */
angular.module('ngSwApp')
  .controller('FacesettingsCtrl', ['$routeParams', 'betaface', 'toastr', '$location', 'userFace', function ($routeParams, betaface, toastr, $location, userFace) {
    var self = this;
    self.ready = false;
    self.uid = $routeParams.uid || '';
    //DEBUG
    //self.uid = '28d3ea52-1094-4739-b11a-38d767edcdff';
    //END DEBUG
    self.mode = self.uid ? 'recognize' : 'manual';
    self.faceData = {
      age: '23'
    };

    var tries = 0;

    if (self.mode === 'manual') {
      self.ready = true;
    } else {
      setUpWithUid(self.uid);
    }

    function getFaceData(uid) {
      return betaface.getInfo(uid);
    }

    // disable name checks cos API is silly names
    // jscs:disable

    function parseFaceData(data) {
      if (data.int_response !== 0) {
        toastr.warning(data.string_response, 'Photon pattern recognition failed');
        self.uid = '';
        self.ready = true;
      } else if (data.faces.length > 1) {
        toastr.error('Let\'s try again', 'Multiple organisms detected');
        $location.path('/');
      } else {
        var fd = {};
        var face = data.faces[0];
        var tags = face.tags;
        console.log(face.tags);
        for (var i = 0; i < tags.length; i++) {
          var name = camelize(tags[i].name);
          fd[name] = tags[i].value;
        }
        console.log(fd);
        return fd;
      }
    }


    function setUpWithUid(uid) {
      if (tries >= 10) {
        toastr.warning('Manual processing fallback engaged', 'Photon pattern recognition failed');
        self.uid = '';
        self.ready = true;
        return;
      }

      getFaceData(uid).$promise.then(function(data) {
        // response 1 means still processing
        if (data.int_response === 1) {
          tries++;
          setTimeout(function() {
            setUpWithUid(uid);
          }, 2000);
          return;
        }
        userFace.setFaceData(parseFaceData(data)); // make it globally available
        self.faceData = userFace.getFaceData();
        self.ready = true;
      }, function() {
        toastr.warning('Manual processing fallback engaged', 'Photon pattern recognition failed');
        self.uid = '';
        self.ready = true;
      });
    }

    // converts strings with spaces to camelCase
    // allows accessing by object.myName instead of object['my name']
    function camelize(str) {
      return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
        return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
      }).replace(/\s+/g, '');
    }

    self.updateAndContinue = function() {
      userFace.setFaceDataNormalized(self.faceData);
      $location.path('/processing');
    }

  }]);
//jscs:enable
