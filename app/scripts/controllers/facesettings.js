'use strict';

/**
 * @ngdoc function
 * @name ngSwApp.controller:FacesettingsCtrl
 * @description
 * # FacesettingsCtrl
 * Controller of the ngSwApp
 */
angular.module('ngSwApp')
  .controller('FacesettingsCtrl', function ($routeParams, betaface, toastr, $location) {
    var self = this;
    self.ready = false;
    self.uid = $routeParams.uid || '';
    //DEBUG
    self.uid = '28d3ea52-1094-4739-b11a-38d767edcdff';
    //END DEBUG
    self.mode = self.uid ? 'recognize' : 'manual';

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
    function setFaceData(faceData) {
      // update form info
    }

    function parseFaceData(data) {
      if (data.int_response !== 0) {
        toastr.error('Let\'s try again', 'No human organisms detected');
        $location.path('/');
      } else if (data.faces.length > 1) {
        toastr.error('Let\'s try again', 'Multiple organisms detected');
        $location.path('/');
      } else {
        var fd = {};
        var face = data.faces[0];
        var tags = face.tags;
        console.log(face.tags);
        for (var i = 0; i < tags.length; i++) {
          fd[tags[i].name] = tags[i].value;
        }
        console.log(fd);
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
        if (data.int_response === 1) {
          tries++;
          setTimeout(function() {
            setUpWithUid(uid);
          }, 2000)
        }
        var faceData = parseFaceData(data);
        setFaceData(faceData);
        self.ready = true;
      }, function() {
        toastr.warning('Manual processing fallback engaged', 'Photon pattern recognition failed');
        self.uid = '';
        self.ready = true;
      });
    }

  });
//jscs:enable
