'use strict';
const Controller = require('egg').Controller;

class PointController extends Controller {
  async addPoint() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.point.addPoint(params)
    ctx.body = {
      total: 0,
      data: res,
      code: 200,
      isSucceed: true,
    }
  }

  async getAllPoint() {
    const { ctx } = this;
    const params = ctx.request.query;
    const res = await ctx.service.graduationRequirement.getAllRequirement(params)
    for (let i = 0; i < res.majorRequirement.length; i++) {
      const point = await ctx.service.point.getPointByIds(res.majorRequirement[i].point)
      res.majorRequirement[i].point = point;
    }
    ctx.body = {
      total: 0,
      data: res,
      code: 200,
      isSucceed: true,
    }
  }

  async addCurrRelationship() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log(params)
    const res = await ctx.service.point.addCurrRelationship(params)
    ctx.body = {
      total: 0,
      data: res,
      code: 200,
      isSucceed: true,
    }
  }

  async delCurrRelationship() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.point.delCurrRelationship(params)
    ctx.body = {
      total: 0,
      data: res,
      code: 200,
      isSucceed: true,
    }
  }
}

module.exports = PointController;