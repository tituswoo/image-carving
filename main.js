(function(tooling) {
  'use strict';
  window.onload = function() {
    var originalVideo = document.querySelector('#video-player');
    var videoContainers = document.querySelector('#video-containers');
    var preview = document.querySelector('#video-preview');
    var fileUpload = document.querySelector('#fileUpload');
    var videoPipeline = pipeline(originalVideo);

    videoContainers.style.visibility = 'hidden';

    fileUpload.addEventListener('change', function(e) {
      var file = this.files[0];
      var fileURL = URL.createObjectURL(file);
      var video = videoPipeline(fileURL);

      video.on('loaded', function(video) {
        preview.width = video.videoWidth;
        preview.height = video.videoHeight;
        videoContainers.style.visibility = 'visible';
      });

      video.imageStream(function(imageData) {
        var previewCtx = preview.getContext('2d');
        var grayscaleTool = tooling.use('grayscale');

        grayscaleTool(imageData).then(function(imageData) {
          previewCtx.putImageData(imageData, 0, 0);
        });
      });
    });
  };
})(tooling);
