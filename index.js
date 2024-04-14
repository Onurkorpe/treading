'use strict';

const express = require('express');
const app = express();

app.get('/', function (req, res) {

    res.send('Hemen al');
    console.log('istek geldi');

});

app.post('/', function (req, res) {
  res.send('Hemen al');
   console.log('istek geldi');

});

app.listen(80, function () {
  console.log('Sunucu çalışıyor...');
});