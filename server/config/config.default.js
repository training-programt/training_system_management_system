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

  

  // File模式
  config.multipart = {
    mode: 'stream',
    fileSize: '10mb',
    whitelist: ['.xlsx', '.md', 'word', 'jpg']
  }

  // 安全
  config.security = {
    csrf:{
      enable:false
    },
    domainWhiteList:['*']
  }

  // 跨域
  config.cors = {
    origin: 'http://localhost:9000',
    credentials: true,

    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  }

  // 七牛
  config.qiniuConfig = {
    accessKey: '8-I_J1XYGKnmCXAhGVCiazW3bcOD_CWORqvTE0j9',
    secretKey: 'ILIkDDJe6cNo6usq01f80Nvgt8c9RJrF8c1ctt1i',
    dataDucket: 'tsms',
    fileUrl: 'http://qknn0lmdu.hd-bkt.clouddn.com/'
  }

  return {
    ...config,
    ...userConfig
  };
};
