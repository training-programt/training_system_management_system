'use strict';
const Service = require('egg').Service;
class PointService extends Service {
  async addPoint(params) {
    const { ctx } = this;
    const res = await ctx.model.Point.create(params)
    console.log(res)
    return res;
  }
}
module.exports = PointService;