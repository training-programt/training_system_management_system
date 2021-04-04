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
      .populate('course', '_id course')
      .populate("major", '_id name')
      .populate('teacher', '_id name')
      .populate('semester', '_id semesterName')
      .limit(parseInt(params.pageSize))
      .skip(parseInt(params.pageSize) * (parseInt(params.page) - 1))
      .sort();
    console.log(result)
    if (result) {
      for (let i = 0; i < result.length; i++) {
        result[i].course.course = await ctx.service.course.getCourseById(result[i].course.course)
      }
    }

    return result
  }

  async addTeachingInfo(params) {
    const { ctx } = this;
    const result = await ctx.model.TeachingInfo.create(params);
    const role = await ctx.model.Role.findOne({ roleName: '授课教师' })
    if (result && role) {
      const data = {
        teacher: params.teacher,
        role: [role._id]
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

  async getTeachingInfoByTeacher(params) {
    const { ctx } = this;
    let semester = params.semester ? {
      semester: params.semester
    } : {};
    const res = await ctx.model.TeachingInfo
      .find(
        { $and: [semester, { teacher: params.teacher }] }
      )
      .populate("major", '_id name')
      .populate('semester', '_id semesterName')
      .populate('course', '_id name')
      .limit(parseInt(params.pageSize))
      .skip(parseInt(params.pageSize) * (parseInt(params.page) - 1))
      .sort();
    return res
  }
}
module.exports = TeachingInfoService;