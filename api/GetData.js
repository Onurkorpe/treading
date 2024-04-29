const Binance = require("node-binance-api");
require("dotenv").config();

const binance = new Binance().options({
  APIKEY: process.env.API_KEY,
  APISECRET: process.env.API_SECRET,
  recvWindow: 60000,
  verbose: true,
});

const getData = async function getFuturesBalance(process,coin) {

  return new Promise(async (resolve, reject) => {
    try {
      const symbol = coin;
      console.log(`${symbol}coin `);
      const balancePercent = 10;
      const getBalance = await binance.futuresBalance();
      
      let availableBalance = getBalance[6].availableBalance;
      availableBalance = (availableBalance / 100) * balancePercent;
      console.log('bakiye: ' + availableBalance);
      
      const lastPrice = await binance.prices(symbol);
      console.log(`${symbol} son fiyatı: ${lastPrice[symbol]}`);

      resolve(availableBalance,lastPrice);
    } catch (error) {
      reject(error);
    }
  });

  // const symbol = coin;
  // console.log(`${symbol}coin `)
  // const balancePercent = 10;
  // const getBalance = await binance.futuresBalance();
 
  // let availableBalance = getBalance[6].availableBalance;
  // availableBalance = (availableBalance / 100) * balancePercent;
  // console.log('bakiye: ' + availableBalance);
  

// try {
  
//   const lastPrice = await binance.prices(symbol);

//   console.log(`${symbol} son fiyatı: ${lastPrice[symbol]}`);
// } catch (error) {
//   console.log("hata " + error)
  
// }



  // let quantity = (availableBalance / lastPrice[symbol]) * 10;
  // quantity = quantity.toFixed(0);
  // console.log(quantity);

  // if (process === 'buy') {
  //   const response = await binance.futuresMarketBuy(symbol, quantity);
  //   console.info(response);
  // } else if (process === 'sell') {
  //   const response = await binance.futuresMarketSell(symbol, quantity);
  //   console.info(response);
  // } else {
  //   console.error('Geçersiz işlem tipi');
  // }

};

module.exports = getData;
