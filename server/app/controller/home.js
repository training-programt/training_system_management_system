'use strict';
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;

    ctx.body = 'home'
  }

  async upload() {
    const { ctx, config } = this;
    const uploadToken = await ctx.service.qiniu.getToken(config.qiniuConfig.dataDucket);
    const data = await ctx.service.qiniu.uploadFiles(uploadToken);
    if(data) {
      ctx.body = {
        "message": '上传成功',
        "isSucceed": true,
      }
    } else {
      ctx.body = {
        "message": "上传失败",
        "isSucceed": false,
      }
    }
  }
  // 得到某表所有数据 测试
  async getList(){
    const ctx = this.ctx;
    var aa = await ctx.service.test.find({});
    ctx.body = aa
  }
}

module.exports = HomeController;
