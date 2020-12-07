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

    const total = await ctx.model.Permission.find().count();
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

  async addPermission() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.model.Permission.create(params);
    ctx.body = {
      total: 0,
      data: res,
      code: 200,
      isSucceed: true,
      newPrimaryKeys: {}
    }
  }

}

module.exports = PermissionController;