const Binance = require('node-binance-api');
require("dotenv").config();

const binance = new Binance().options({
  APIKEY: process.env.API_KEY,
  APISECRET: process.env.API_SECRET
});

const getData = async function getFuturesBalance(process, coin) {

try {
  const data = await binance.futuresBalance();
  console.info(data[6].availableBalance  );
} catch (error) {
  console.log(error)
}

};

module.exports = getData;
