'use strict';
const Service = require('egg').Service;
const qiniu = require('qiniu');
const path = require('path');
const md5 = require('md5');
const fs = require('fs');
const sendToWormhole = require('stream-wormhole');

class QiniuService extends Service {
  async getToken(scope) {
    const { config } = this;
    let options = {
      scope,
      returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
    };

    let mac = new qiniu.auth.digest.Mac(config.qiniuConfig.accessKey, config.qiniuConfig.secretKey);
    let putPolicy = new qiniu.rs.PutPolicy(options);
    let uploadToken = putPolicy.uploadToken(mac);

    return uploadToken;
  }

  async uploadFiles(uploadToken) {
    const { ctx, config } = this;
    const configs = new qiniu.conf.Config();
    configs.zone = qiniu.zone.Zone_z0;
    const stream = await ctx.getFileStream();
    const filename = md5(stream.filename) + path.extname(stream.filename).toLocaleLowerCase();
    const localFilePath = path.join(__dirname, '../public/uploads', filename);
    const writeStream = fs.createWriteStream(localFilePath);
    try {
      stream.pipe(writeStream);
      const formUploader = new qiniu.form_up.FormUploader(configs);
      const putExtra = new qiniu.form_up.PutExtra();
      const fileSrc = await new Promise((resolve, reject) =>
        formUploader.putFile(
          uploadToken,
          filename,
          localFilePath,
          putExtra,
          (respErr, respBody, respInfo) => {
            if (respErr) {
              reject("");
            }
            if (respInfo.statusCode == 200) {
              resolve(config.qiniuConfig.fileUrl + respBody.key);
            } else {
              reject("");
            }
            fs.unlinkSync(localFilePath);
          }
        ))
      if (fileSrc !== "") {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      await sendToWormhole(stream);
      return false;
    }
  }

  async deleteFiles(filename) {
    const { config } = this;
    const mac = new qiniu.auth.digest.Mac(config.qiniuConfig.accessKey, config.qiniuConfig.secretKey);
    const configs = new qiniu.conf.Config();
    config.zone = qiniu.zone.Zone_z0;
    const bucketManager = new qiniu.rs.BucketManager(mac, configs);
    bucketManager.delete(
      config.qiniuConfig.dataDucket,
      md5(filename),
      (respErr, respBody, respInfo) => {
        if(respErr) {
          return respErr;
        }
        return respInfo.statusCode;
      })
  }
}

module.exports = QiniuService;