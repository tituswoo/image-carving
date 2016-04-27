var pipeline = (function() {
  'use strict';

  return pipeline;

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
      events.trigger('imageStream',
        _getImageDataFromVideo()
      );
    });

    function _getImageDataFromVideo() {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      return context.getImageData(0, 0, width, height);
    }

    return function(fileURL) {
      video.src = fileURL;
      var eventListeners = [];

      return {
        on: function(eventName, cb) {
          events.register(eventName, cb);
        },
        renderResolution: function(res) {
          _renderResolution = res;
        }
      };
    };
  }

  function eventsManager() {
    var registeredEvents = [];

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
