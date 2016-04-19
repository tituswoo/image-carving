// http://html5doctor.com/video-canvas-magic/

'use strict';

$(function() {
  var originalVideo = document.querySelector('#video-player');
  var preview = document.querySelector('#video-preview');
  var videoPipeline = pipeline(originalVideo);

  $('#fileUpload').on('change', function() {
    var file = $(this)[0].files[0];
    var fileURL = URL.createObjectURL(file);
    var video = videoPipeline(fileURL);

    video.on('loaded', function(video) {
      preview.width = video.videoWidth;
      preview.height = video.videoHeight;
      preview.style.width = video.clientWidth;
      preview.style.height = video.clientHeight;
    });

    video.imageStream(function(imageData) {
      var previewCtx = preview.getContext('2d');
      imageData = modifyFrame(imageData);
      previewCtx.putImageData(imageData, 0, 0);
    });
  });
});

function modifyFrame(imageData) {
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
