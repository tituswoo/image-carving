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
        var splitVid = new ffmpeg();
        fs.existsSync(filePath + '/pics') || fs.mkdirSync(filePath + '/pics');
        splitVid.addInput(filePath + "/flag.mp4")
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
            console.log(error);
        })
        .outputOptions(['-r 29.97'])
        .output(filePath + '/pics/output_%04d.png')
        .run();
    });

    // Error handler:
    uploader.on("error", function(event){
        console.log("Error from uploader", event);
    });
});





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
