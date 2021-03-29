'use strict';
const Service = require('egg').Service;
class ApprovalService extends Service {
  async getApproval(params) {
    const { ctx } = this;
    const reg = new RegExp(params.query, 'i')
    const result = await ctx.model.Approval
      .find({
        $and: [{ name: { $regex: reg } }]
      })
      .limit(parseInt(params.pageSize))
      .skip(parseInt(params.pageSize) * (parseInt(params.page) - 1))
      .sort();
    return result
  }

  async addApproval(params) {
    const { ctx } = this;
    const result = await ctx.model.Approval.create(params);
    return result
  }

  async updateApproval(params) {
    const { ctx } = this;
    const result = await ctx.model.Approval.findByIdAndUpdate(params._id, params)
    return result
  }

  async delApproval(params) {
    const { ctx } = this;
    const result = await ctx.model.Approval.remove(params)
    return result
  }

  async delMoreApproval(params) {
    const { ctx } = this;
    const result = await ctx.model.Approval.remove(
      { _id: { $in: params } }
    )
    return result
  }

  async getAllApproval() {
    const { ctx } = this;
    const result = await ctx.model.Approval.find().sort()
    return result;
  }

  async getCount() {
    const { ctx } = this;
    const count = await ctx.model.Approval.find().count();
    return count;
  }
}
module.exports = ApprovalService;