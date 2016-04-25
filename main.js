(function($, tooling) {
  'use strict';
  $(function() {
    var originalVideo = document.querySelector('#video-player');
    var videoContainers = document.querySelector('#video-containers');
    var preview = document.querySelector('#video-preview');
    var videoPipeline = pipeline(originalVideo);

    videoContainers.style.visibility = 'hidden';

    $('#fileUpload').on('change', function() {
      var file = $(this)[0].files[0];
      var fileURL = URL.createObjectURL(file);
      var video = videoPipeline(fileURL);

      video.on('loaded', function(video) {
        preview.width = video.videoWidth;
        preview.height = video.videoHeight;
        videoContainers.style.visibility = 'visible';
      });

      video.imageStream(function(imageData) {
        var previewCtx = preview.getContext('2d');
        imageData = modifyFrame(imageData);
        previewCtx.putImageData(imageData, 0, 0);
      });
    });
  });

  function modifyFrame(imageData) {
    var grayscale = tooling.use('grayscale');
    console.log(grayscale);
    return grayscale(imageData);
  }
})(jQuery, tooling);
