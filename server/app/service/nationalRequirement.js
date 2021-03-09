'use strict';
const Service = require('egg').Service;
class NationalRequirementService extends Service {
  async getRequirement(params) {
    const { ctx } = this;
    const reg = new RegExp(params.national_name, 'i')
    const result = await ctx.model.NationalRequirement.find({
      $or: [{ national_name: { $regex: reg } }]
    })
    return result;
  }

  async addRequirement(params) {
    const { ctx } = this;
    const res = await ctx.model.NationalRequirement.create(params);
    return res;
  }

  async delRequirement(params) {
    const { ctx } = this;
    const res = await ctx.model.NationalRequirement.deleteOne(params);
    return res;
  }

  async updateRequirement(params) {
    const { ctx } = this;
    console.log(params)
    const res = await ctx.model.NationalRequirement.findByIdAndUpdate(
      { _id: params._id },
      {
        $set: params
      }
    )
    return res;
  }

  async addPoint(params) {
    const { ctx} = this;
    const res = await ctx.model.NationalRequirement.findByIdAndUpdate(
      { _id: params._id },
      {
        $push: {
          point: params.pointData
        }
      }
    )
    return res
  }
}
module.exports = NationalRequirementService;