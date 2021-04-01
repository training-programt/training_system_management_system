'use strict';
const Service = require('egg').Service;
class GraduationRequirementService extends Service {

  async getRequirementById(params) {
    const { ctx } = this;
    const res = await ctx.model.GraduationRequirement
      .findById(params._id)
      .populate('majorRequirement.point')
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

  async delRequirementAndPoint(params) {
    const { ctx } = this;
    const requirement = await ctx.service.graduationRequirement.getRequirementById(params)
    if (requirement) {
      await ctx.service.point.delMorePoint(requirement.point)
    }
    const res = await ctx.model.GraduationRequirement.deleteOne(params)
    return res;
  }
}
module.exports = GraduationRequirementService;