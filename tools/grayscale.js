(function(tooling) {
  'use strict';

  function grayscale(imageData) {
    // Copied below code from
    // "http://html5doctor.com/video-canvas-magic/"
    // To test that my pipeline works...
    var data = imageData.data;

    for(var i = 0; i < data.length; i+=4) {
      var r = data[i];
      var g = data[i+1];
      var b = data[i+2];
      var brightness = (3*r+4*g+b)>>>3;
      data[i] = brightness;
      data[i+1] = brightness;
      data[i+2] = brightness;
    }

    return imageData;
  }

  tooling.register({
    name: 'grayscale',
    description: 'Make your video black and white.',
    fn: grayscale
  });
})(tooling);
