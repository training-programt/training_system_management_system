'use strict';
const Controller = require('egg').Controller;

class NationalRequirementController extends Controller {
  async getRequirement() {
    const { ctx } = this;
    const res = await ctx.service.nationalRequirement.getRequirement()
    ctx.body = {
      total: res.length,
      data: res,
      code: 200,
      isSucceed: true,
    }
  }

  async addRequirement() {
    const { ctx } = this;
    const params = ctx.request.body;

    const res = await ctx.service.nationalRequirement.addRequirement(params)

    if (res) {
      ctx.body = {
        total: 0,
        data: res,
        code: 200,
        message: '新增成功',
        isSucceed: true,
      }
    }

    ctx.body = {
      total: 0,
      data: res,
      code: 200,
      message: '新增失败',
      isSucceed: false,
    }

  }

  async delRequirement() {
    const { ctx } = this;
    
    const params = ctx.request.body;
    const res = await ctx.service.nationalRequirement.delRequirement(params)
    
    if (res) {
      ctx.body = {
        total: 0,
        data: res,
        code: 200,
        message: '删除成功',
        isSucceed: true,
      }
    }

    ctx.body = {
      total: 0,
      data: res,
      code: 200,
      message: '删除失败',
      isSucceed: false,
    }
  }
}

module.exports = NationalRequirementController;