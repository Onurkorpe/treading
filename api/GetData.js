const Binance = require('binance-api-node').default
require("dotenv").config();

const client = Binance({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET
});

const getData = async function getFuturesBalance(process, coin) {

try {
  console.log(
    await client.allOrders({
      symbol: 'ETHBTC',
    }),
  )
} catch (error) {
  console.log(error)
}

};

module.exports = getData;
