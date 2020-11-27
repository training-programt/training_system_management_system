/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1593741457206_6615';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017/tsms',
      options: {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      },
    },
  }

  // File模式
  config.multipart = {
    mode: 'file'
  }

  // 安全
  config.security = {
    csrf: false
  }

  // 跨域
  config.cors = {
    credentials: true
  }

  // 七牛
  config.qiniuKey = {
    accessKey: '8-I_J1XYGKnmCXAhGVCiazW3bcOD_CWORqvTE0j9',
    secretKey: 'ILIkDDJe6cNo6usq01f80Nvgt8c9RJrF8c1ctt1i'
  }

  return {
    ...config,
    ...userConfig
  };
};
