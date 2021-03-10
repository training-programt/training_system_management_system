'use strict';
const Service = require('egg').Service;
class TableService extends Service {
  async createMajorObjReqRelation(params) {
    const { ctx } = this;
    const res = await ctx.model.MajorObjReqRelation.create(params)
    return res;
  }

  async createMajorNationCoverRelation(params) {
    const { ctx } = this;
    const res = await ctx.model.MajorNationCoverRelation.create(params)
    return res;
  }
}
module.exports = TableService;