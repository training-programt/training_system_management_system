'use strict';
const Service = require('egg').Service;
class CourseTypeService extends Service {
  async getCourseType(params) {
    const { ctx } = this;
    const reg = new RegExp(params.query, 'i')
    const result = await ctx.model.CourseType
      .find({
        $and: [{ name: { $regex: reg } }]
      })
      .limit(parseInt(params.pageSize))
      .skip(parseInt(params.pageSize) * (parseInt(params.page) - 1))
      .sort();
    return result
  }

  async addCourseType(params) {
    const { ctx } = this;
    const result = await ctx.model.CourseType.create(params);
    return result
  }

  async updateCourseType(params) {
    const { ctx } = this;
    const result = await ctx.model.CourseType.findByIdAndUpdate(params._id, params)
    return result
  }

  async delCourseType(params) {
    const { ctx } = this;
    const result = await ctx.model.CourseType.remove(params)
    return result
  }

  async delMoreCourseType(params) {
    const { ctx } = this;
    const result = await ctx.model.CourseType.remove(
      { _id: { $in: params } }
    )
    return result
  }

  async getAllCourseType() {
    const { ctx } = this;
    const result = await ctx.model.CourseType.find().sort()
    return result;
  }

  async getCount() {
    const { ctx } = this;
    const count = await ctx.model.CourseType.find().count();
    return count;
  }
}
module.exports = CourseTypeService;