'use strict';

const express = require('express');
let app = express();

app.use(express.static('public'));

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});


// var express = require('express'),
//     multer  = require('multer');
// var app = express();
// var ffmpeg = require('fluent-ffmpeg');
//
// var multer = require('multer');
// var upload = multer({ dest: './uploads' });
//
// app.post('/', function (req, res) {
//     console.log(req.body); //contains the variables
//     console.log(req.files); //contains the file references
//     res.send('Thank you for uploading!');
// });
//
// app.listen(8000);



//
// var app = require('http').createServer(handler)
//   , io = require('socket.io').listen(app)
//   , fs = require('fs')
//   , exec = require('child_process').exec
//   , util = require('util')
//
// app.listen(8080);
// //
// function handler (req, res) {
//   fs.readFile(__dirname + '/index.html',
//   function (err, data) {
//     if (err) {
//       res.writeHead(500);
//       return res.end('Error loading index.html');
//     }
//     res.writeHead(200);
//     res.end(data);
//   });
// }

// var splitVid = new ffmpeg();
//
// splitVid.addInput('./flag.mp4')
// .on('start', function(ffmpegCommand) {
//     /// log something maybe
// })
// .on('progress', function(data) {
//     /// do stuff with progress data if you want
// })
// .on('end', function() {
//     /// encoding is complete, so callback or move on at this point
// })
// .on('error', function(error) {
//     /// error handling
// })
// .outputOptions(['-vf fps=30 '])
// .output('output/out%d.png')
// .run();
//
//
//
//
//
// var ffmpeg = require('fluent-ffmpeg');
//
// var proc = new ffmpeg();
//
// proc.addInput('output/out%d.png')
// .on('start', function(ffmpegCommand) {
//     /// log something maybe
// })
// .on('progress', function(data) {
//     /// do stuff with progress data if you want
// })
// .on('end', function() {
//     /// encoding is complete, so callback or move on at this point
// })
// .on('error', function(error) {
//     /// error handling
// })
// .addInputOption('-framerate 30')
// .outputOptions(['-c:v libx264','-pix_fmt yuv420p'])
// .output('out.mp4')
// .run();
