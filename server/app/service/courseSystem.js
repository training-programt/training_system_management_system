'use strict';
const Service = require('egg').Service;
class CourseSystemService extends Service {
  async getCourseSystem(params) {
    const { ctx } = this;
    const result = await ctx.model.CourseSystem
      .find({
        // $or: [
        // { courseType: params.courseType },
        // { grade: params.grade }
        // ]
      })
      .populate('leader', '_id name')
      .populate('course', '_id name')
      .populate('grade', '_id name')
      .populate('major', '_id name')
      .populate('courseType', '_id name')
      .limit(parseInt(params.pageSize))
      .skip(parseInt(params.pageSize) * (parseInt(params.page) - 1))
      .sort();
    return result
  }

  async addCourseSystem(params) {
    const { ctx } = this;
    const result = await ctx.model.CourseSystem.create(params);
    if (result) {
      const data = {
        leader: params.leader,
        role: ['6004f464120f362f90f32e71']
      }
      await this.updateTeacherRole(data)
      return result
    }
    return false
  }

  async updateTeacherRole(params) {
    const { ctx } = this;
    const res = await ctx.model.Teacher.findByIdAndUpdate(params.leader, params);
    return res;
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