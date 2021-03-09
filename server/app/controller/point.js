'use strict';
const Controller = require('egg').Controller;
 
class PointController extends Controller {
  async addPoint() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log(params)
    const res = await ctx.service.point.addPoint(params)
    ctx.body = {
      total: 0,
      data: res,
      code: 200,
      isSucceed: true,
    }
  }
}
 
module.exports = PointController;