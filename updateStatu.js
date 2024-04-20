const fs = require('fs');

const updateStatus = async function (req, res) {
    

    fs.readFile('status.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(req.query)
        let jsonData = JSON.parse(data);
        let keyData = req.query.time;

       jsonData.data.name1[keyData]=req.query.value;
        
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

