'use strict';
const Service = require('egg').Service;
class GraduationRequirementService extends Service {
  async createRequirement(params) {
    const { ctx } = this;
    const res = await ctx.model.GraduationRequirement.create(params)
    return res;
  }

  async updateRequirement(params) {
    const { ctx } = this;
    const res = await ctx.model.GraduationRequirement.findOneAndUpdate({_id: params.objectId}, params)
    return res;
  }
}
module.exports = GraduationRequirementService;