(function(tooling, Promise) {
  'use strict';

  // better ways to do this (probably should use
  // currying or something to remove need for passing
  // in the idata for each filter or for passing
  // in the context, but class project and
  // time constraints. So function gt form atm :(
  function seamCarver(imageData, amount, ctx) {
    return new Promise(function(resolve, reject) {
      var worker = new Worker('tools/seamCarve/SeamCarver.js');
      worker.postMessage({
        image: {
          width: imageData.width,
          height: imageData.height,
          data: imageData.data
        },
        adjust: {
          width: imageData.width - amount
        }
      });

      worker.addEventListener('message', function(e) {
        var action = e.data.action;
        if (action === 'done') {
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
