'use strict';
const Controller = require('egg').Controller;
 
class TeachRecordController extends Controller {
  async getTeachingRecord() {
    const { ctx } = this;
    const params = ctx.request.query;
    const res = await ctx.service.teachingRecord.getTeachingRecord(params)

    ctx.body = {
      total: res.length,
      data: res,
      code: 200,
      isSucceed: true,
    }
  }
}
 
module.exports = TeachRecordController;