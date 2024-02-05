/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "offline-service";

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    myAppName: "offline-service",
  };

  // jwt
  config.jwt = {
    secret: "skyFormulas",
    expiresIn: "24h",
  };

  // 密码加密
  config.bcrypt = {
    saltRounds: 10,
  };

  config.mongoose = {
    client: {
      url: "mongodb://lltrip:LLTrip-2022@dds-j6ccf019fdfb82841131-pub.mongodb.rds.aliyuncs.com:3717,dds-j6ccf019fdfb82842252-pub.mongodb.rds.aliyuncs.com:3717/LLTrip?replicaSet=mgset-66210039",
      
      options: {
        // user: "root",
        // pass: "LLTrip2022",
        useUnifiedTopology: true,
      },
    },
  };

  config.redis = {
    // 单个数据库用client
    // client: {
    //   port: 6379, // Redis port
    //   host: "r-j6c26r3xdt46dh47wrpd.redis.rds.aliyuncs.com", // Redis host
    //   password: "lltrip@2022",
    //   db: 0,
    // },

    // 使用多个数据库连接
    clients: {
      db0: {
        port: 6379, // Redis port
        host: "r-uf6r3mrlxpmik7gdsjpd.redis.rds.aliyuncs.com", // Redis host
        password: "lltrip@2022",
        db: 0,
      },
      db1: {
        port: 6379, // Redis port
        host: "r-uf6r3mrlxpmik7gdsjpd.redis.rds.aliyuncs.com", // Redis host
        password: "lltrip@2022",
        db: 1,
      },
      db2: {
        port: 6379, // Redis port
        host: "r-uf6r3mrlxpmik7gdsjpd.redis.rds.aliyuncs.com", // Redis host
        password: "lltrip@2022",
        db: 2,
      },
    },
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [
      "http://47.243.79.251",
      "http://skywingtrip.com",
      "http://127.0.0.1",
      "http://47.242.231.174",
      "http://skywinghub.com",
    ],
  };

  config.cors = {
    // origin: "http://skywingtrip.com",
    origin: '*',
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH",
    credentials: true,
  };

  return {
    ...config,
    ...userConfig,
  };
};
