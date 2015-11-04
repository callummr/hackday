/**
 * Webcam Directive
 *
 * (c) Jonas Hartmann http://jonashartmann.github.io/webcam-directive
 * License: MIT
 *
 * @version: 3.0.0
 */
'use strict';

(function() {
  // GetUserMedia is not yet supported by all browsers
  // Until then, we need to handle the vendor prefixes
  navigator.getMedia = ( navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);

  // Checks if getUserMedia is available on the client browser
  window.hasUserMedia = function hasUserMedia() {
    return navigator.getMedia ? true : false;
  };
})();

angular.module('ngSwApp')
  .directive('webcam', function (toastr, betaface, $routeParams, $location) {
    return {
      template: '' +
        '<div class="webcam-container">' +
          '<div class="row">' +
            '<div class="col-lg-6 col-sm-12 text-center">' +
              '<button class="btn btn-lg btn-default" ng-click="savePhoto()" ng-disabled="!photoReady">Take Photo</button>' +
            '</div>' +
            '<div class="col-lg-6 col-sm-12 text-center">' +
              '<button class="btn btn-lg btn-default" ng-click="uploadPhoto()" ng-disabled="!uploadReady">Upload Photo</button>' +
            '</div>' +
          '</div>' +
          '<!-- webcam itself is inserted below -->' +
          '<div class="row">' +
            '<div class="webcam-video col-lg-6 col-sm-12 text-center"></div>' +
            '<div class="webcam-photo col-lg-6 col-sm-12 text-center"></div>' +
          '</div>' +
        '</div>',
      restrict: 'E',
      replace: true,
      transclude: true,
      scope:
      {
        onError: '&',
        onStream: '&',
        onStreaming: '&',
        placeholder: '=',
        config: '=channel'
      },
      link: function postLink($scope, element) {
        var videoElem = null,
            videoStream = null,
            placeholder = null;

        $scope.config = $scope.config || {};
        $scope.photoReady = false;
        $scope.uploadReady = false;

        var _removeDOMElement = function _removeDOMElement(DOMel) {
          if (DOMel) {
            angular.element(DOMel).remove();
          }
        };

        var onDestroy = function onDestroy() {
          if (!!videoStream && typeof videoStream.stop === 'function') {
            videoStream.stop();
          }
          if (!!videoElem) {
            delete videoElem.src;
          }
        };

        // called when camera stream is loaded
        var onSuccess = function onSuccess(stream) {
          toastr.success('Photon receptor detected');
          videoStream = stream;

          // Firefox supports a src object
          if (navigator.mozGetUserMedia) {
            videoElem.mozSrcObject = stream;
          } else {
            var vendorURL = window.URL || window.webkitURL;
            videoElem.src = vendorURL.createObjectURL(stream);
          }

          /* Start playing the video to show the stream from the webcam */
          videoElem.play();
          $scope.config.video = videoElem;

          /* Call custom callback */
          if ($scope.onStream) {
            $scope.onStream({stream: stream});
          }

          $scope.photoReady = true;
        };

        // called when any error happens
        var onFailure = function onFailure(err) {
          toastr.warning('Falling back to manual entry', 'Photon receptor failure');

          _removeDOMElement(placeholder);
          if (console && console.log) {
            console.log('Webcam initialization failed: ', err);
          }

          /* Call custom callback */
          if ($scope.onError) {
            $scope.onError({err:err});
          }

          $location.path('/faceSettings');

          return;
        };

        var savePhoto = $scope.savePhoto = function savePhoto() {
            if (!$scope.config.canvas) {
            var canv = document.createElement('canvas');
            //canv.setAttribute('style', 'display:none;');
            canv.setAttribute('width', videoElem.videoWidth);
            canv.setAttribute('height', videoElem.videoHeight);
            element.find('.webcam-photo').append(canv);
            $scope.config.canvas = canv;
          }

          var canvas = $scope.config.canvas;
          var context = canvas.getContext('2d');

          context.drawImage(videoElem, 0, 0, videoElem.width, videoElem.height);
          var data = canvas.toDataURL('image/png');
          canvas.setAttribute('src', data);
          $scope.uploadReady = true;
        }

        // jscs:disable
        // cos of the API using funnny names etc
        var uploadPhoto = $scope.uploadPhoto = function uploadPhoto() {
          var b64 = element.find('.webcam-photo canvas').attr('src');
          b64 = b64.split(',')[1]; // remove the data:image... part
          var request = betaface.upload(b64);
          request.then(function(data) {
            $location.path('/faceSettings/' + data.img_uid);
          }, function(data) {
            toastr.warning('Manual processing fallback engaged', 'Photon pattern recognition failed');
            $location.path('/faceSettings');
          });
        };
        // jscs:enable

        var startWebcam = function startWebcam() {
          videoElem = document.createElement('video');
          videoElem.setAttribute('class', 'webcam-live');
          videoElem.setAttribute('autoplay', '');
          element.find('.webcam-video').append(videoElem);

          if ($scope.placeholder) {
            placeholder = document.createElement('img');
            placeholder.setAttribute('class', 'webcam-loader');
            placeholder.src = $scope.placeholder;
            element.find('.webcam-video').append(placeholder);
          }

          // Default variables
          var isStreaming = false,
            width = element.width = $scope.config.videoWidth || 320,
            height = element.height = 0;

          // Check the availability of getUserMedia across supported browsers
          if (!window.hasUserMedia()) {
            onFailure({code:-1, msg: 'Browser does not support getUserMedia.'});
            return;
          }

          var mediaConstraint = { video: true, audio: false };
          navigator.getMedia(mediaConstraint, onSuccess, onFailure);

          /* Start streaming the webcam data when the video element can play
           * It will do it only once
           */
          videoElem.addEventListener('canplay', function() {
            if (!isStreaming) {
              var scale = width / videoElem.videoWidth;
              height = (videoElem.videoHeight * scale) ||
                        $scope.config.videoHeight;
              videoElem.setAttribute('width', width);
              videoElem.setAttribute('height', height);
              isStreaming = true;

              $scope.config.video = videoElem;

              _removeDOMElement(placeholder);

              /* Call custom callback */
              if ($scope.onStreaming) {
                $scope.onStreaming();
              }
            }
          }, false);
        };

        var stopWebcam = function stopWebcam() {
          onDestroy();
          videoElem.remove();
        };

        $scope.$on('$destroy', onDestroy);
        $scope.$on('START_WEBCAM', startWebcam);
        $scope.$on('STOP_WEBCAM', stopWebcam);

        startWebcam();

      }
    };
  });
