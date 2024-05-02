const Binance = require("node-binance-api");
require("dotenv").config();

const binance = new Binance().options({
  APIKEY: process.env.API_KEY,
  APISECRET: process.env.API_SECRET,
});

const getData = async function getFuturesBalance(process, coin,amount) {
  try {
  

    console.log(amount);
    if (coin === 'PEPEUSDT') {
      coin = '1000PEPEUSDT';
      amount = amount *1000;
    }
    const symbol = coin;
    
    console.log(`coin ${symbol} `);
    console.info( await binance.futuresCancelAll( symbol) );


    const balancePercent = 50;
    const getBalance = await binance.futuresBalance();
    let availableBalance = getBalance[6].availableBalance;
    availableBalance = (availableBalance / 100) * balancePercent;
    availableBalance = availableBalance.toFixed(2);
    console.log("bakiye: " + availableBalance);

     const lastPrice = amount;
     console.log(`${symbol} son fiyatı: ${lastPrice}`);
     let quantity = (availableBalance / lastPrice) * 10;
     quantity = quantity.toFixed(0);
     console.log("miktar " +quantity);

    if (process === "buy") {
      const response = await binance.futuresMarketBuy(symbol, quantity);
      console.info(response);
    } else if (process === "sell") {
       const response = await binance.futuresMarketSell(symbol, quantity);
       console.info(response);
     } else {
       console.error("Geçersiz işlem tipi");
     }
  } catch (error) {
    console.log(error);
  }
};

module.exports = getData;
