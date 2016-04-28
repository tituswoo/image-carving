var pipeline = (function() {
  'use strict';

  return pipeline;
  var _renderRate = 10;

  function pipeline(video) {
    var events = eventsManager();
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    var width, height;
    var redrawInterval;

    var _renderResolution = 0.5;

    video.addEventListener('playing', function() {
      redrawInterval = setInterval(function() {
        var imageData = _getImageDataFromVideo();
        events.trigger('imageStream', imageData);
      }, 0);
    });

    video.addEventListener('seeked', function() {
      events.trigger('imageStream',
        _getImageDataFromVideo()
      );
    });

    video.addEventListener('pause', function() {
      clearInterval(redrawInterval);
    });

    video.addEventListener('loadeddata', function() {
      width = video.videoWidth;
      height = video.videoHeight;

      canvas.width = width * _renderResolution;
      canvas.height = height * _renderResolution;

      events.trigger('loaded', video, {
        width: canvas.width,
        height: canvas.height
      });
      events.trigger('imageStream', _getImageDataFromVideo());
    });

    function _getImageDataFromVideo() {
      let w = video.videoWidth * _renderResolution;
      let h = video.videoHeight * _renderResolution;

      context.drawImage(video, 0, 0, w, h);

      return context.getImageData(0, 0,
        width * _renderResolution,
        height * _renderResolution);
    }

    return function(fileURL) {
      video.src = fileURL;
      var eventListeners = [];

      return {
        on(eventName, cb) {
          events.register(eventName, cb);
        },
        renderResolution(res) {
          _renderResolution = res;
        },
        refresh() {
          events.trigger('imageStream', _getImageDataFromVideo());
        },
        getCanvasDimensions() {
          return {
            width: width * _renderResolution,
            height: height * _renderResolution
          };
        },
        renderRate(rate) {
          console.log('rendering rate:', rate);
        }
      };
    };
  }

  function eventsManager() {
    var registeredEvents = [];
    var rateCount = 0;

    return {
      trigger: function(eventName, ...args) {
        registeredEvents.filter(function(event) {
          return event.name === eventName;
        }).forEach(function(event) {
          event.cb(...args);
        });
      },
      register: function(eventName, cb) {
        registeredEvents.push({
          name: eventName,
          cb
        });
      }
    };
  }
})();
