((tooling, Promise) => {
  'use strict';

  let pipe = imageData => {
    return Promise.resolve(imageData);
  };

  tooling.register({
    name: 'pipe',
    description: 'Pipes input to the output without changing it.',
    fn: pipe
  });
})(tooling, Promise);
