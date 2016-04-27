(function(tooling, Promise) {
  'use strict';

  function grayscale(imageData) {
    return new Promise(function(resolve, reject) {
      // // Copied based on algorithm from:
      // // "http://html5doctor.com/video-canvas-magic/"

      var data = imageData.data;

      for(var i = 0; i < data.length; i += 4) {
        var r = data[i];
        var g = data[i+1];
        var b = data[i+2];
        var brightness = (3*r+4*g+b)>>>3;
        data[i] = brightness;
        data[i+1] = brightness;
        data[i+2] = brightness;
      }

      // webImage(imageData).forEach(function(p, save) {
      //   var brightness = (3*p.r+4*p.g+p.b)>>>3;
      //   p.r = brightness;
      //   p.g = brightness;
      //   p.b = brightness;
      //   save(p);
      // });

      resolve(imageData);
    });
  }

  tooling.register({
    name: 'grayscale',
    description: 'Make your video black and white.',
    fn: grayscale
  });
})(tooling, Promise);
