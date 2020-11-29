'use strict';

const Controller = require('egg').Controller;
const fs = require('mz/fs');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;

    let scope = 'upload-egg-test';

    let uploadToken = await ctx.service.qiniu.getToken(scope);

    console.log(uploadToken);

    let filePath = '/JavaWeb/training_system_management_system/server/README.md';

    let res = await ctx.service.qiniu.uploadFile(uploadToken, filePath);

    ctx.body = res;

  }

  async upload() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    const name = 'egg-multipart-test/' + path.basename(file.filename);
    let result;
    try {
      result = await ctx.oss.put(name, file.filepath);
    } finally {
      await fs.unlink(file.filepath);
    }
    ctx.body = {
      url: result.url,
      requestBody: ctx.request.body
    };
  }
}

module.exports = HomeController;
