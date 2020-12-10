'use strict';
const Controller = require('egg').Controller;

class PermissionController extends Controller {
  async getPermission() {
    const { ctx } = this;

    const params = ctx.request.query;
    const data = {
      pageSize: parseInt(params.pageSize),
      page: parseInt(params.page) - 1,
    }

    const total = await ctx.model.Permission.find().countDocuments();
    const res = await ctx.model.Permission
      .find()
      .limit(data.pageSize)
      .skip(data.pageSize * data.page)

    ctx.body = {
      total: total,
      data: res,
      code: 200,
      isSucceed: true,
      newPrimaryKeys: {}
    }
  }

  async createOrUpdatePermission() {
    const { ctx } = this;
    const params = ctx.request.body;
    if (params._id) {
      const res = await ctx.model.Permission.where({_id: params._id}).updateOne(params)
      ctx.body = {
        total: res.length,
        data: res,
        message: '修改成功',
        code: 200,
        isSucceed: true,
      }
    } else {
      const res = await ctx.model.Permission.create(params);
      ctx.body = {
        total: 0,
        data: res,
        code: 200,
        message: '新增成功',
        isSucceed: true,
      }
    }
  }
}

module.exports = PermissionController;