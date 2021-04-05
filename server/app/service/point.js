'use strict';
const Service = require('egg').Service;
class PointService extends Service {
  async addPoint(params) {
    const { ctx } = this;
    const res = await ctx.model.Point.create(params)
    return res;
  }

  async getPointByIds(params) {
    const { ctx } = this;
    const res = await ctx.model.Point.find({ _id: { $in: params } }).populate('course.name', 'name')
    return res;
  }

  async addCurrRelationship(params) {
    const { ctx } = this;
    const res = await ctx.model.Point.findByIdAndUpdate(
      { _id: params.point },
      {
        graduationRequirement: params.name,
        $push: {
          course: {
            courseName: params.courseName,
            weight: params.weight,
          }
        }
      },
    )
    return res;
  }

  async delCurrRelationship(params) {
    const {ctx} = this;
    console.log(params);
    const res = await ctx.model.Point.findByIdAndUpdate(
      { _id: params.pointId },
      {
        $pull: {
          course: {
            _id: params._id,
          }
        }
      },
    )
    return res;
  }

  async delMorePoint(params) {
    const { ctx } = this;
    const res = await ctx.model.Point.remove({_id: {$in: params}})
    return res;
  }
}
module.exports = PointService;