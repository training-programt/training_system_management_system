'use strict';
const Service = require('egg').Service;
class GraduationRequirementService extends Service {

  async getAllRequirement(params) {
    const { ctx } = this;
    const res = await ctx.model.GraduationRequirement.findById(params._id, { majorRequirement: true });
    return res;
  }

  async createRequirement(params) {
    const { ctx } = this;
    const res = await ctx.model.GraduationRequirement.create(params)
    return res;
  }

  async updateRequirement(params) {
    const { ctx } = this;
    const res = await ctx.model.GraduationRequirement.findOneAndUpdate({ _id: params.requirementId }, params)
    return res;
  }

  async getRequirementById(params) {
    const { ctx } = this;
    const res = await ctx.model.GraduationRequirement
      .findOne(params)
    return res;
  }
}
module.exports = GraduationRequirementService;