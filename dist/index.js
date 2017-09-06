'use strict';

var express = require('express');
var app = express();
var path = require('path');
//const secure = require('express-force-https')
//app.use(secure)

app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/favicon.ico', express.static(path.join(__dirname, '../public/favicon.ico')));
// app.use('/images', express.static(path.join(__dirname, '../public/images')))
// app.use('/css', express.static(path.join(__dirname, '../public/css')))
// app.use('/js', express.static(path.join(__dirname, '../public/js')))

app.use(function (req, res, next) {
   if (!req.secure && req.get('X-Forwarded-Proto') !== 'https' && req.hostname !== 'localhost' && req.hostname !== '127.0.0.1' && req.hostname !== 'ironman.dev') {
      res.redirect('https://' + req.hostname + req.url);
   } else {
      next();
   }
});

app.get('*.js', function (req, res, next) {
   req.url = req.url + '.gz';
   res.set('Content-Encoding', 'gzip');
   next();
});

app.get('*', function (req, res) {
   //res.send('Hello World 2!')
   res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(1337, function () {
   console.log('Prose react app listening on port 1337.');
});