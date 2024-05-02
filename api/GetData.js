const Binance = require("node-binance-api");
require("dotenv").config();

const binance = new Binance().options({
  APIKEY: process.env.API_KEY,
  APISECRET: process.env.API_SECRET,
});

const getData = async function getFuturesBalance(process, coin, amount) {
  try {
    console.log(amount);
    if (coin === "PEPEUSDT") {
      coin = "1000PEPEUSDT";
      amount = amount * 1000;
    }
    const symbol = coin;

    console.log(`coin ${symbol} `);

    const balancePercent = 50;
    const getBalance = await binance.futuresBalance();
    const positions = await binance.futuresPositionRisk();
    for (const position of positions) {
      if (parseFloat(position.positionAmt) > 0) {
        await binance.futuresMarketSell(
          position.symbol,
          Math.abs(parseFloat(position.positionAmt))
        );
      } else if (parseFloat(position.positionAmt) < 0) {
        await binance.futuresMarketBuy(
          position.symbol,
          Math.abs(parseFloat(position.positionAmt))
        );
      }
    }
    console.log("Tüm pozisyonlar kapatıldı.");

    const balance = getBalance[6].balance;
    const fixedBalance = (balance / 100) * balancePercent.toFixed(2);

    const lastPrice = amount;
    console.log(`${symbol} son fiyatı: ${lastPrice}`);
    const quantity = ((fixedBalance / lastPrice) * 10).toFixed(0);
    console.log("miktar " + quantity);

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
