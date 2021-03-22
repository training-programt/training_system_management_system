'use strict';
const Service = require('egg').Service;
class TeachingInfoService extends Service {
  async getTeachingInfo(params) {
    const { ctx, app } = this;
    const mongoose = app.mongoose;
    let semester = params.semester ? {
      semester: mongoose.Types.ObjectId(params.semester)
    } : {}
    const result = await ctx.model.TeachingInfo
      .find({
        $and: [semester]
      })
      .populate("major", '_id name')
      .populate('teacher', '_id name')
      .populate('semester', '_id semesterName')
      .populate('basicCourse', '_id name')
      .limit(parseInt(params.pageSize))
      .skip(parseInt(params.pageSize) * (parseInt(params.page) - 1))
      .sort();
    return result
  }

  async addTeachingInfo(params) {
    const { ctx } = this;
    const result = await ctx.model.TeachingInfo.create(params);
    if (result) {
      const data = {
        teacher: params.teacher,
        role: ['6004f464120f362f90f32e72']
      }
      await this.updateTeacherRole(data)
      return result
    }
    return result
  }

  async updateTeacherRole(params) {
    const { ctx } = this;
    const res = await ctx.model.Teacher.findByIdAndUpdate(params.teacher, params);
    return res;
  }

  async updateTeachingInfo(params) {
    const { ctx } = this;
    const result = await ctx.model.TeachingInfo.findByIdAndUpdate(params._id, params)
    return result
  }

  async delTeachingInfo(params) {
    const { ctx } = this;
    const result = await ctx.model.TeachingInfo.remove(params)
    return result
  }

  async delMoreTeachingInfo(params) {
    const { ctx } = this;
    const result = await ctx.model.TeachingInfo.remove(
      { _id: { $in: params } }
    )
    return result
  }

  async getAllTeachingInfo() {
    const { ctx } = this;
    const result = await ctx.model.TeachingInfo.find().sort()
    return result;
  }

  async getCount() {
    const { ctx } = this;
    const count = await ctx.model.TeachingInfo.find().count();
    return count;
  }
}
module.exports = TeachingInfoService;