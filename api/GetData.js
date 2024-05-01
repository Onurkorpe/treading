const Binance = require("node-binance-api");
require("dotenv").config();

const binance = new Binance().options({
  APIKEY: process.env.API_KEY,
  APISECRET: process.env.API_SECRET,
});

const getData = async function getFuturesBalance(process, coin,amount) {
  try {
    console.log(amount);
    const symbol = coin;
    console.log(`${symbol}coin `);
    const balancePercent = 30;
    const getBalance = await binance.futuresBalance();
    let availableBalance = getBalance[6].availableBalance;
    availableBalance = (availableBalance / 100) * balancePercent;
    console.log("bakiye: " + availableBalance);

     const lastPrice = amount;
     console.log(`${symbol} son fiyatı: ${lastPrice}`);
     let quantity = (availableBalance / lastPrice) * 10;
     quantity = quantity.toFixed(0);
     console.log(quantity);

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
