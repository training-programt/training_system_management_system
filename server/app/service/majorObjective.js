'use strict';
const Service = require('egg').Service;
class MajorObjectiveService extends Service {
  async getMajorObjective(params) {
    const { ctx } = this;
    // const reg = new RegExp(params.query, 'i')
    // const result = await ctx.model.TeachRoom
    //   .find({
    //     // $and: [
    //     //     { $or: [{ name: { $regex: reg } }] },
    //     //     { $or: [{ type: parseInt(params.type) }] }
    //     // ]
    //     $or: [{ name: { $regex: reg } }, { type: params.type }]
    //   })
    //   .populate('director')
    //   .populate('college')
    //   .populate('major')
    //   .populate('teachers')
    //   .limit(parseInt(params.pageSize))
    //   .skip(parseInt(params.pageSize) * parseInt(params.page))
    //   .sort('sort')
    const result = await ctx.model.MajorObjective.find().populate('major');
    return result;
  }

  async addMajorObjective(params) {
    const { ctx } = this;
    const result = await ctx.model.MajorObjective.create(params)
    return result;
  }

  async getMajorObjectiveDetails(params) {
    const { ctx } =this;
    const res = await ctx.model.MajorObjective
      .findById(params._id)
      .populate('major')
    return res
  }

  async delMajorObjective( params ) {
    const { ctx } = this;
    const result = await ctx.model.MajorObjective.findByIdAndDelete(params);
    return result;
  }
}
module.exports = MajorObjectiveService;