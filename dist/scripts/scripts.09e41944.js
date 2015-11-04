"use strict";angular.module("ngSwApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","toastr"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).otherwise({redirectTo:"/"})}]),angular.module("ngSwApp").controller("MainCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("ngSwApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),function(){navigator.getMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia,window.hasUserMedia=function(){return navigator.getMedia?!0:!1}}(),angular.module("ngSwApp").directive("webcam",["toastr","betaface",function(a,b){return{template:'<div class="webcam-container"><div class="row"><div class="col-lg-6 col-sm-12 text-center"><button class="btn btn-lg btn-default" ng-click="savePhoto()" ng-disabled="!photoReady">Take Photo</button></div><div class="col-lg-6 col-sm-12 text-center"><button class="btn btn-lg btn-default" ng-click="uploadPhoto()" ng-disabled="!uploadReady">Upload Photo</button></div></div><!-- webcam itself is inserted below --><div class="row"><div class="webcam-video col-lg-6 col-sm-12 text-center"></div><div class="webcam-photo col-lg-6 col-sm-12 text-center"></div></div></div>',restrict:"E",replace:!0,transclude:!0,scope:{onError:"&",onStream:"&",onStreaming:"&",placeholder:"=",config:"=channel"},link:function(c,d){var e=null,f=null,g=null;c.config=c.config||{},c.photoReady=!1,c.uploadReady=!1;var h=function(a){a&&angular.element(a).remove()},i=function(){f&&"function"==typeof f.stop&&f.stop(),e&&delete e.src},j=function(b){if(a.success("Photon receptor detected"),f=b,navigator.mozGetUserMedia)e.mozSrcObject=b;else{var d=window.URL||window.webkitURL;e.src=d.createObjectURL(b)}e.play(),c.config.video=e,c.onStream&&c.onStream({stream:b}),c.photoReady=!0},k=function(b){a.warning("Falling back to manual entry","Photon receptor failure"),h(g),console&&console.log&&console.log("The following error occured: ",b),c.onError&&c.onError({err:b})},l=(c.savePhoto=function(){if(!c.config.canvas){var a=document.createElement("canvas");a.setAttribute("width",e.videoWidth),a.setAttribute("height",e.videoHeight),d.find(".webcam-photo").append(a),c.config.canvas=a}var b=c.config.canvas,f=b.getContext("2d");f.drawImage(e,0,0,e.width,e.height);var g=b.toDataURL("image/png");b.setAttribute("src",g),c.uploadReady=!0},c.uploadPhoto=function(){var a=d.find(".webcam-photo canvas").attr("src");a=a.split(",")[1];b.upload(a)},function(){e=document.createElement("video"),e.setAttribute("class","webcam-live"),e.setAttribute("autoplay",""),d.find(".webcam-video").append(e),c.placeholder&&(g=document.createElement("img"),g.setAttribute("class","webcam-loader"),g.src=c.placeholder,d.find(".webcam-video").append(g));var a=!1,b=d.width=c.config.videoWidth||320,f=d.height=0;if(!window.hasUserMedia())return void k({code:-1,msg:"Browser does not support getUserMedia."});var i={video:!0,audio:!1};navigator.getMedia(i,j,k),e.addEventListener("canplay",function(){if(!a){var d=b/e.videoWidth;f=e.videoHeight*d||c.config.videoHeight,e.setAttribute("width",b),e.setAttribute("height",f),a=!0,c.config.video=e,h(g),c.onStreaming&&c.onStreaming()}},!1)}),m=function(){i(),e.remove()};c.$on("$destroy",i),c.$on("START_WEBCAM",l),c.$on("STOP_WEBCAM",m),l()}}}]),angular.module("ngSwApp").service("betaface",["$resource",function(a){function b(a){console.log(a)}function c(a){var b=[];return Array.prototype.forEach.call(a,function(a){b.push(a.charCodeAt())}),b}var d="d45fd466-51e2-4701-8da8-04351c872236",e="171e8465-f548-401d-b63b-caf0dc28df5f",f="http://www.betafaceapi.com/service_json.svc/",g={uploadImage:{method:"POST",params:{},url:f+"UploadNewImage_File"},getInfo:{method:"POST",params:{},url:f+"GetImageInfo"}},h=a(f,{},g);this.upload=function(a){var f=c(a);return h.uploadImage({},{api_key:d,api_secret:e,original_filename:"image.png",detection_flags:"classifiers",imagefile_data:f},b,b)},this.getInfo=function(a){return h.getInfo({},{api_key:"d45fd466-51e2-4701-8da8-04351c872236",api_secret:"171e8465-f548-401d-b63b-caf0dc28df5f",img_uid:a},b,b)}}]),angular.module("ngSwApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/main.html",'<div class="jumbotron"> <webcam></webcam> </div>')}]);