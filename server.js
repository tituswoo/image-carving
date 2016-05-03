'use strict';

// Require the libraries:
var SocketIOFileUpload = require('socketio-file-upload'),
    socketio = require('socket.io'),
    express = require('express');
var ffmpeg = require('fluent-ffmpeg');
let fs = require('fs');

// Make your Express server:
var app = express()
    .use(SocketIOFileUpload.router)
    .use(express.static(__dirname + '/public'))
    .listen(8000);

// Start up Socket.IO:
var io = socketio.listen(app);

var filePath = __dirname + '/uploads';

fs.existsSync(filePath) || fs.mkdirSync(filePath);

io.sockets.on("connection", function(socket){

  console.log(__dirname);
    // Make an instance of SocketIOFileUpload and listen on this socket:
    var uploader = new SocketIOFileUpload();
    uploader.dir = filePath;
    uploader.mode = "0666";
    uploader.listen(socket);

    // Do something when a file is saved:
    uploader.on("saved", function(event){
        console.log('SAVED', event.file);
    });

    // Error handler:
    uploader.on("error", function(event){
        console.log("Error from uploader", event);
    });
});


var splitVid = new ffmpeg();

splitVid.addInput(filePath + '/video.m4v')
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
