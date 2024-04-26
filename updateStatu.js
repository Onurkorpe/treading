const fs = require('fs');

const updateStatus = async function (req, res) {
    

    fs.readFile('status.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(req.body.coin)
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

