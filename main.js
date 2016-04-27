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
      var previewCtx = preview.getContext('2d');
      var video = videoPipeline(fileURL);

      video.renderResolution(0.25);

      video.on('loaded', function(video, dimen) {
        preview.width = dimen.width;
        preview.height = dimen.height;
        videoContainers.style.visibility = 'visible';
      });

      video.on('imageStream', function(imageData) {
        var grayscaleTool = tooling.use('grayscale');
        var seamCarvingTool = tooling.use('seamCarve');

        // grayscaleTool(imageData).then(function(idata) {
        //   return previewCtx.putImageData(idata, 0, 0);
        // });

        seamCarvingTool(imageData, previewCtx).then(function(idata) {
          return previewCtx.putImageData(idata, 0, 0);
        })

        // grayscaleTool(imageData).then(function(idata) {
        //   return seamCarvingTool(idata, previewCtx);
        // }).then(function(idata) {
        //   console.log('drawing to canvas...');
        //   return previewCtx.putImageData(idata, 0, 0);
        // });

      });
    });
  };
})(tooling);
