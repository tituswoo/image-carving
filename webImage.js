var webImage = (function() {
  'use strict';

  function webImage(imageData) {
    var data = imageData.data;
    function forEach(cb) {
      for (var i = 0; i < imageData.data.length; i += 4) {
        var r = data[i];
        var g = data[i + 1];
        var b = data[i + 2];
        var a = data[i + 3];

        cb(_makePixel(r, g, b, a), save(i), i);
      }

      function save(index) {
        return function(pixel) {
          data[index] = pixel.r;
          data[index + 1] = pixel.g;
          data[index + 2] = pixel.b;
          data[index + 3] = pixel.a;
        }
      }
    }

    function _makePixel(r, g, b, a) {
      return {
        r: r,
        g: g,
        b: b,
        a: a
      };
    }

    return {
      forEach: forEach
    };
  }

  return webImage;
})();
