var express = require('express');
var app = express();
var ffmpeg = require('fluent-ffmpeg');

var splitVid = new ffmpeg();

splitVid.addInput('./flag.mp4')
.on('start', function(ffmpegCommand) {
    /// log something maybe
})
.on('progress', function(data) {
    /// do stuff with progress data if you want
})
.on('end', function() {
    /// encoding is complete, so callback or move on at this point
})
.on('error', function(error) {
    /// error handling
})
.outputOptions(['-vf fps=30 '])
.output('output/out%d.png')
.run();





var ffmpeg = require('fluent-ffmpeg');

var proc = new ffmpeg();

proc.addInput('output/out%d.png')
.on('start', function(ffmpegCommand) {
    /// log something maybe
})
.on('progress', function(data) {
    /// do stuff with progress data if you want
})
.on('end', function() {
    /// encoding is complete, so callback or move on at this point
})
.on('error', function(error) {
    /// error handling
})
.addInputOption('-framerate 30')
.outputOptions(['-c:v libx264','-pix_fmt yuv420p'])
.output('out.mp4')
.run();
