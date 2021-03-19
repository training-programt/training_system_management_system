'use strict';
const Service = require('egg').Service;
class CourseSystemService extends Service {
  async getCourseSystem(params) {
    const { ctx } = this;
    const reg = new RegExp(params.query, 'i')
    const result = await ctx.model.CourseSystem
      .find({
        $and: [{ name: { $regex: reg } }]
      })
      .populate('teacher')
      .populate('basicCourse')
      .populate('grade')
      .populate('major')
      .populate('courseType')
      .limit(parseInt(params.pageSize))
      .skip(parseInt(params.pageSize) * (parseInt(params.page) - 1))
      .sort();
    return result
  }

  async addCourseSystem(params) {
    const { ctx } = this;
    const result = await ctx.model.CourseSystem.create(params);
    return result
  }

  async updateCourseSystem(params) {
    const { ctx } = this;
    const result = await ctx.model.CourseSystem.findByIdAndUpdate(params._id, params)
    return result
  }

  async delCourseSystem(params) {
    const { ctx } = this;
    const result = await ctx.model.CourseSystem.remove(params)
    return result
  }

  async delMoreCourseSystem(params) {
    const { ctx } = this;
    const result = await ctx.model.CourseSystem.remove(
      { _id: { $in: params } }
    )
    return result
  }

  async getAllCourseSystem() {
    const { ctx } = this;
    const result = await ctx.model.CourseSystem.find().sort()
    return result;
  }

  async getCount() {
    const { ctx } = this;
    const count = await ctx.model.CourseSystem.find().count();
    return count;
  }
}
module.exports = CourseSystemService;