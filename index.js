'use strict';
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();
const fs = require('fs');
const updateStatus = require('./updateStatu');

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(urlencodedParser);
app.use(cors({
  origin: ['https://treadingreact.onrender.com','http://localhost:5173']
}));


app.post("/updateStatus",jsonParser,updateStatus);



app.get('/api/textfile', (req, res) => {
  fs.readFile('status.txt', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Dosya okunamadı.');
      return;
    }
    res.send(data);
  });
});

app.get('/', (req, res) => {
 
  
    res.send('Başarılı');
 
});

app.listen(80, function () {
  console.log('Sunucu çalışıyor...');
});