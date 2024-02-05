"use strict";

const Service = require("egg").Service;

class ExchangeService extends Service {
  async getExchangeList(payload) {
    const { app } = this;
    const { fromCurrency, toCurrency } = payload;
    let exchangeList = [];

    if (fromCurrency && toCurrency) {
      const exchangeKey = `${fromCurrency}2${toCurrency}`;
      const value = await app.redis.get("db2").smembers(exchangeKey);
      const exchange = {
        _id: exchangeKey,
        fromCurrency: fromCurrency,
        toCurrency: toCurrency,
        rate: value.length > 0 ? value[0] : "-",
      };
      exchangeList.push(exchange);
    } else {
      const exchangeKeyList = await app.redis.get("db2").keys("*");
      for (const key of exchangeKeyList) {
        if (key.includes("2")) {
          // 获取每个键的值
          const value = await app.redis.get("db2").smembers(key);
          const exchange = {
            _id: key,
            fromCurrency: key.split("2")[0],
            toCurrency: key.split("2")[1],
            rate: value.length > 0 ? value[0] : "-",
          };

          exchangeList.push(exchange);
        }
      }

      if (fromCurrency) {
        exchangeList = exchangeList.filter(
          (key) => key.fromCurrency == fromCurrency
        );
      } else if(toCurrency){
        exchangeList = exchangeList.filter((key) => key.toCurrency == toCurrency);
      }
    }

    return exchangeList;
  }
}

module.exports = ExchangeService;
