'use strict';
const Controller = require('egg').Controller;

class MajorObjectiveController extends Controller {
  async getMajorObjective() {
    const { ctx } = this;
    const params = ctx.request.query;
    const res = await ctx.service.majorObjective.getMajorObjective(params);

    ctx.body = {
      total: res.length,
      data: res,
      code: 200,
      isSucceed: true,
    }
  }

  async addMajorObjective() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.majorObjective.addMajorObjective(params);

    ctx.body = {
      total: 0,
      data: res,
      message: '新增成功',
      code: 200,
      isSucceed: true,
    }
  }

  async getMajorObjectiveDetails() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log(params)
    const res = await ctx.service.majorObjective.getMajorObjectiveDetails(params);
    
    ctx.body = {
      total: 0,
      data: res,
      code: 200,
      isSucceed: true,
    }
  }

  async delMajorObjective() {
    const { ctx } = this;
    const params = ctx.request.body ;
    const res = await ctx.service.majorObjective.delMajorObjective(params)

    ctx.body = {
      total: 0,
      data: res,
      message: '删除成功',
      code: 200,
      isSucceed: true,
    }
  }
}

module.exports = MajorObjectiveController;