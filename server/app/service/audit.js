'use strict';
const Service = require('egg').Service;
class AuditService extends Service {
  async getAudit(params) {
    const { ctx } = this;
    const reg = new RegExp(params.query, 'i')
    const result = await ctx.model.Examine
      .find({
        $and: [{ name: { $regex: reg } }]
      })
      .limit(parseInt(params.pageSize))
      .skip(parseInt(params.pageSize) * (parseInt(params.page) - 1))
      .sort();
    return result
  }

  async addAudit(params) {
    const { ctx } = this;
    const result = await ctx.model.Examine.create(params);
    return result
  }

  async updateAudit(params) {
    const { ctx } = this;
    const result = await ctx.model.Examine.findByIdAndUpdate(params._id, params)
    return result
  }

  async delAudit(params) {
    const { ctx } = this;
    const result = await ctx.model.Examine.remove(params)
    return result
  }

  async delMoreAudit(params) {
    const { ctx } = this;
    const result = await ctx.model.Examine.remove(
      { _id: { $in: params } }
    )
    return result
  }

  async getAllAudit() {
    const { ctx } = this;
    const result = await ctx.model.Examine.find().sort()
    return result;
  }

  async getCount() {
    const { ctx } = this;
    const count = await ctx.model.Examine.find().count();
    return count;
  }
}
module.exports = AuditService;