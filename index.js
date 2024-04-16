'use strict';
const cors = require('cors');
const express = require('express');
const app = express();
const fs = require('fs');

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.get('/', function (req, res) {

    res.send('Hemen al');
    console.log('istek geldi');

});

app.post('/', function (req, res) {
  res.send('Hemen al');
   console.log('istek geldi');

});

app.get('/api/textfile', (req, res) => {
  fs.readFile('status.txt', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Dosya okunamadı.');
      return;
    }
    res.send(data);
  });
});

app.listen(80, function () {
  console.log('Sunucu çalışıyor...');
});