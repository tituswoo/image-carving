var express = require('express');
var app = express();
var ffmpeg = require('fluent-ffmpeg');

// var mergedVideo = ffmpeg()
// ;
// var videoNames = ['./flag.mp4', './flag.mp4'];

// videoNames.forEach(function(videoName){
//     mergedVideo = mergedVideo.addInput(videoName);
// });

// mergedVideo.mergeToFile('./mergedVideo.mp4', './tmp/')
// .on('error', function(err) {
//     console.log('Error ' + err.message);
// })
// .on('end', function() {
//     console.log('Finished!');
// });

//-------------------

// var thumbler = require('video-thumb');
// thumbler.extract('flag.mp4', 'snapshot.png', '00:00:02', '853x480', function(){

//     console.log('snapshot saved to snapshot.png (200x125) with a frame at 00:00:22');

// });

// var progress = new ffmpeg('./flag.mp4')
//   .on('progress', function(progress) {
//   	console.log(progress.currentFps)
//   });


var proc = new ffmpeg('./flag.mp4').native()
  .takeScreenshots({
      count: 240
    }, './output', function(err) {
    console.log('screenshots were saved')
  });


