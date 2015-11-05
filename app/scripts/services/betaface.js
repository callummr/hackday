// jscs:disable
// cos of the API using funnny names etc
'use strict';

/**
 * @ngdoc service
 * @name ngSwApp.betaface
 * @description
 * # betaface
 * Service in the ngSwApp.
 */
angular.module('ngSwApp')
  .service('betaface', function ($resource, guid) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    // API key and secret are public trials from betafaceapi.com
    // so no problem exposing them here
    var apikey = 'd45fd466-51e2-4701-8da8-04351c872236';
    var secret = '171e8465-f548-401d-b63b-caf0dc28df5f';
    var betafaceUrl = 'http://www.betafaceapi.com/service_json.svc/';
    var actions = {
      uploadImage: {
        method: 'POST',
        params: {},
        url: betafaceUrl + 'UploadImage'
      },
      getInfo: {
        method: 'POST',
        params: {},
        url: betafaceUrl + 'GetImageInfo'
      }
    }

    var betafaceApi = $resource(betafaceUrl, {}, actions);

    this.upload = function(image) {
      image = image.split(',')[1]; // remove the data:image/png bit
      return betafaceApi.uploadImage({}, {
        api_key: apikey,
        api_secret: secret,
        original_filename: '' + guid.generate() + '.jpg',
        detection_flags: 'classifiers',
        image_base64: image
      }, tempResponseHandler, tempResponseHandler);
    }

    this.getInfo = function(id) {
      return betafaceApi.getInfo({}, {
        api_key: 'd45fd466-51e2-4701-8da8-04351c872236',
        api_secret: '171e8465-f548-401d-b63b-caf0dc28df5f',
        img_uid: id
      }, tempResponseHandler, tempResponseHandler);
    }

    function tempResponseHandler(data) {
      console.log(data);
    }

    function base64ToBytes(b64) {
      var byteArray = [];
      // get ASCII charcode for every char in the string
      Array.prototype.forEach.call(b64, function(char) {
        byteArray.push(char.charCodeAt());
      });
      return byteArray;
    }
  });
// jscs:enable
