'use strict';
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;

    // const data = [
    //   {
    //     icon: 'icon-home',
    //     key: 'Home',
    //     level: 1,
    //     name: '首页',
    //     sort: 1,
    //     permission_id: '5fc99d94b24db609708dcbd6'
    //   },
    //   {
    //     icon: 'icon-setting',
    //     key: 'setting',
    //     level: 1,
    //     name: '系统设置',
    //     sort: 2,
    //     permission_id: '5fc99d94b24db609708dcbd7'
    //   }
    // ]

    // await ctx.model.Menu.create(data);

    // let res = await ctx.model.Menu.aggregate([
    //   {
    //     $lookup: {
    //       from: 'permission',
    //       localField: 'permission_id',
    //       foreignField: '_id',
    //       as: 'permission'
    //     }
    //   },
    // ])


    const res = await ctx.model.Teacher
      .find()
      .populate('role')
      .populate('position_id')
      .populate('education_id')
      .populate('post_id')
      .populate('teachRoom_id')

    ctx.body = res
  }

  async upload() {
    const { ctx, config } = this;
    const uploadToken = await ctx.service.qiniu.getToken(config.qiniuConfig.dataDucket);
    const data = await ctx.service.qiniu.uploadFiles(uploadToken);
    if (data) {
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
}

module.exports = HomeController;
