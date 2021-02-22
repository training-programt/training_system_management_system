'use strict';
const Service = require('egg').Service;
class NationalRequirementService extends Service {
  async getRequirement() {
    const { ctx } = this;
    const result = await ctx.model.NationalRequirement.find()
    return result;
  }

  async addRequirement(params) {
    const { ctx } = this;
    const  res = await ctx.model.NationalRequirement.create(params);
    return res;
  }

  async delRequirement(params) {
    const { ctx } = this;
    const res = await ctx.model.NationalRequirement.deleteOne(params);
    return res;
  }

  async updateRequirement(params) {
    const { ctx } = this;
    
  }
}
module.exports = NationalRequirementService;