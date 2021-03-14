'use strict';
const Service = require('egg').Service;
class TeachingRecordService extends Service {
  async getTeachingRecord(params) {
    const { ctx } = this;
    const res = await ctx.model.TeachingRecord.find({teacher: params._id});
    return res;
  }
}
module.exports = TeachingRecordService;