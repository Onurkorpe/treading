const Binance = require("node-binance-api");
require("dotenv").config();

const binance = new Binance().options({
  APIKEY: process.env.API_KEY,
  APISECRET: process.env.API_SECRET,
  recvWindow: 60000,
  verbose: true,
});

async function getData(coin, balancePercent = 10) { // Varsayılan veya argüman kullan
  try {
    const symbol = coin;
    console.log(`${symbol}coin`);

    const getBalance = await binance.futuresBalance();
    const availableBalance = (getBalance[6].availableBalance / 100) * balancePercent;
    console.log('bakiye: ' + availableBalance);

    const lastPrice = await binance.prices(symbol);
    console.log(`${symbol} son fiyatı: ${lastPrice[symbol]}`);

    return { availableBalance, lastPrice }; // Veri için nesne döndür

  } catch (error) {
    if (error.name === 'BinanceError') {
      console.error(`Binance API hatası: ${error.message}`);
    } else {
      console.error(`Hata: ${error}`);
    }
    throw error; // Daha fazla işleme için tekrar at (isteğe bağlı)
  }
}

module.exports = getData;
