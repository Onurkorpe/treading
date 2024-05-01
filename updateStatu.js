const fs = require('fs');
const getData = require('./api/GetData');


const updateStatus = async function (req, res) {
    console.log(req.body.amount);
    getData(req.body.statu,req.body.coin,req.body.amount);

    fs.readFile('status.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
    
         let jsonData = JSON.parse(data);
         let coin = req.body.coin;
         let time = req.body.time;
         let statu = req.body.statu;
         let amount = req.body.amount;
         let createDate = req.body.createDate;

        jsonData.data[coin].time=time;
        jsonData.data[coin].statu=statu;
        jsonData.data[coin].amount=amount;
        jsonData.data[coin].createDate=createDate;
      
         fs.writeFile('status.txt', JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
             if (err) {
                 console.error(err);
                 return;
             }
             res.send('Veri başarıyla güncellendi.');
             console.log('Veri başarıyla güncellendi.');
         });
    });
   
};

module.exports = updateStatus;

