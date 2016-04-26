(function(tooling, Promise) {
  'use strict';

  function seamCarver(imageData, ctx) {
    return new Promise(function(resolve, reject) {
      console.info('starting worker...');
      var worker = new Worker('tools/seamCarve/SeamCarver.js');
      worker.postMessage({
        image: {
          width: imageData.width,
          height: imageData.height,
          data: imageData.data
        },
        adjust: {
          width: imageData.height - 200,
          height: imageData.width - 200
        }
      });

      worker.addEventListener('message', function(e) {
        var action = e.data.action;
        console.info(e.data);
        if (action === 'done') {
          console.info('RENDER COMPLETED!');
          console.log(e.data.image);
          var res = e.data.image;
          var newImage = ctx.createImageData(res.width, res.height);
          for (var i = 0; i < res.data.length; i++) {
             newImage.data[i] = res.data[i];
          }
          resolve(newImage);
        }
      });
    });
  }

  tooling.register({
    name: 'seamCarve',
    description: 'Resize video while keeping the important parts.',
    fn: seamCarver
  });
})(tooling, Promise);
