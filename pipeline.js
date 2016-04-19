var pipeline = (function() {
  'use strict';

  return pipeline;

  function pipeline(video) {
    var events = eventsManager();
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    var width, height;
    var redrawInterval;

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

      video.style.width = video.clientWidth;
      video.style.height = video.clientHeight;

      canvas.width = width;
      canvas.height = height;

      events.trigger('loaded', video);
      events.trigger('imageStream',
        _getImageDataFromVideo()
      );
    });

    function _getImageDataFromVideo() {
      context.drawImage(video, 0, 0, width, height);
      return context.getImageData(0, 0, width, height);
    }

    return function(fileURL) {
      video.src = fileURL;
      var eventListeners = [];

      return {
        on: function(eventName, cb) {
          events.register(eventName, cb);
        },
        imageStream: function(cb) {
          events.register('imageStream', cb);
        }
      };
    };
  }

  function eventsManager() {
    var registeredEvents = [];

    return {
      trigger: function(eventName, args) {
        registeredEvents.filter(function(event) {
          return event.name === eventName;
        }).forEach(function(event) {
          event.cb.call(this, args);
        });
      },
      register: function(eventName, cb) {
        registeredEvents.push({
          name: eventName,
          cb: cb
        });
      }
    };
  }
})();
