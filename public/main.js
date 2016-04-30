(function(tooling) {
  'use strict';

  window.onload = function() {
    var originalVideo = document.querySelector('#video-player');
    var videoContainers = document.querySelector('#video-containers');
    var preview = document.querySelector('#video-preview');
    var fileUpload = document.querySelector('#fileUpload');
    var videoPipeline = pipeline(originalVideo);

    videoContainers.style.visibility = 'hidden';

    let _state = {
      video: {},
      grayscale: false,
      resolution: 1,
      seamCarve: false,
      seamCarveAmount: 0
    };

    let grayscaleChkbox = document.querySelector('#grayscale-chkbox');
    let selectResolution = document.querySelector('#select-resolution');
    let carveChkbox = document.querySelector('#carve-chkbox');
    let carveAmount = document.querySelector('#carve-amount');

    grayscaleChkbox.addEventListener('click', e => {
      _state.grayscale = e.target.checked;
      _state.video.refresh();
    });

    carveAmount.addEventListener('change', e => {
      _state.seamCarveAmount = e.target.value;
      _state.video.refresh();
    });

    selectResolution.addEventListener('change', e => {
      let value = e.target.options[e.target.selectedIndex].value;
      _state.resolution = +value;
      _state.video.renderResolution(_state.resolution);

      let dim = _state.video.getCanvasDimensions();
      preview.width = dim.width;
      preview.height = dim.height;

      carveAmount.max = dim.width;

      _state.video.refresh();
    });

    carveChkbox.addEventListener('change', e => {
      _state.seamCarve = e.target.checked;
      _state.video.refresh();
    });

    fileUpload.addEventListener('change', e => {
      var file = e.target.files[0];
      var fileURL = URL.createObjectURL(file);
      var previewCtx = preview.getContext('2d');

      _state.video = videoPipeline(fileURL);
      _state.video.renderRate(1);
      _state.video.renderResolution(_state.resolution);

      _state.video.on('loaded', function(video, dimen) {
        let dim = _state.video.getCanvasDimensions();
        preview.width = dim.width;
        preview.height = dim.height;
        videoContainers.style.visibility = 'visible';

        carveAmount.max = dim.width;
      });

      _state.video.on('imageStream', function(imageData) {
        let pipeTool = tooling.use('pipe');
        let grayscaleTool = tooling.use('grayscale');
        let carveTool = tooling.use('seamCarve');

        pipeTool(imageData).then(idata => {
          if (_state.seamCarve) {
            return carveTool(idata, _state.seamCarveAmount, previewCtx);
          }
          return idata;
        }).then(idata => {
          return _state.grayscale ? grayscaleTool(idata) : idata;
        }).then(idata => {
          return previewCtx.putImageData(idata, 0, 0);
        });
      });
    });
  };
})(tooling);
