'use strict';
const Service = require('egg').Service;
const qiniu = require('qiniu');

class QiniuService extends Service {
  async getToken(scope) {
    const { config } = this;
    let options = {
      scope,
      returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
    };

    let mac = new qiniu.auth.digest.Mac(config.qiniuKey.accessKey, config.qiniuKey.secretKey);
    let putPolicy = new qiniu.rs.PutPolicy(options);
    let uploadToken = putPolicy.uploadToken(mac);

    return uploadToken;
  }

  async uploadFile(uploadToken, filePath) {
    let config = new qiniu.conf.Config();
    config.zone = qiniu.zone.Zone_z0;
    var localFile = filePath;
    var formUploader = new qiniu.form_up.FormUploader(config);
    var putExtra = new qiniu.form_up.PutExtra();
    var key = 'test.md';
    // 文件上传
    formUploader.putFile(uploadToken, key, localFile, putExtra, function (respErr,
      respBody, respInfo) {
      if (respErr) {
        throw respErr;
      }
      if (respInfo.statusCode == 200) {
        console.log(respBody);
      } else {
        console.log(respInfo.statusCode);
        console.log(respBody);
      }
    });
  }
}

module.exports = QiniuService;