'use strict';
const Service = require('egg').Service;
class CreditStructureService extends Service {
  async createCreditStructure(params) {
    const { ctx } = this;
    const res = await ctx.model.CreditStructure.create(params)
    return res;
  }

  async updateCreditStructure(params) {
    const { ctx } = this;
    const res = await ctx.model.CreditStructure.findOneAndUpdate({ _id: params.creditStructureId }, params)
    return res;
  }

  async getCreditStructure(params) {
    const { ctx } = this;
    const res = await ctx.model.CreditStructure
      .findOne(params)
      .populate('content.courseType', 'name')
    return res;
  }
}
module.exports = CreditStructureService;