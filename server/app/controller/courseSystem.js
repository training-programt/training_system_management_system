'use strict';
const Controller = require('egg').Controller;

class CourseSystemController extends Controller {
  async getCourseSystem() {
    const { ctx } = this;
    const params = ctx.request.query;
    const data = await ctx.service.courseSystem.getCourseSystem(params);
    const count = await ctx.service.courseSystem.getCount();
    ctx.body = {
      total: count,
      data: data,
      code: 200,
      isSucceed: true,
    };
  }
  async findCourseSystem() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log(params)
    const data = await ctx.model.CourseSystem.find({leader:params._id})
    .populate('course')
    ctx.body = {
      total: data.length,
      data: data,
      code: 200,
      isSucceed: true,
    };
  }

  async addCourseSystem() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.courseSystem.addCourseSystem(params)
    if(res) {
      const count = await ctx.service.courseSystem.getCount();
      ctx.body = {
      total: count,
      data: res,
      code: 200,
      isSucceed: true,
    };
    } else {
      ctx.body = {
        total: 0,
        message: '新增失败',
        code: 200,
        isSucceed: true,
      }
    }
    
  }

  async delCourseSystem() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.courseSystem.delCourseSystem(params)
    const count = await ctx.service.courseSystem.getCount();
    ctx.body = {
      total: count,
      data: res,
      code: 200,
      isSucceed: true,
    };
  }

  async updateCourseSystem() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.courseSystem.updateCourseSystem(params)
    const count = await ctx.service.courseSystem.getCount();
    ctx.body = {
      total: count,
      data: res,
      code: 200,
      isSucceed: true,
    };
  }

  async delMoreCourseSystem() {
    const { ctx } = this;
    const params = ctx.request.body;
    const data = params.ids.split(',');
    const res = await ctx.service.courseSystem.delMoreCourseSystem(data)
    const count = await ctx.service.courseSystem.getCount();
    ctx.body = {
      total: count,
      data: res,
      code: 200,
      isSucceed: true,
    };
  }

  async getAllCourseSystem() {
    const { ctx } = this;
    const res = await ctx.service.courseSystem.getAllCourseSystem();
    ctx.body = {
      total: res.length,
      data: res,
      code: 200,
      isSucceed: true,
    }
  }

  async getCourseBySemester() {
    const { ctx} = this;
    const params = ctx.request.body;
    const res = await ctx.service.courseSystem.getCourseBySemester(params)
    ctx.body = {
      total: res.length,
      data: res,
      code: 200,
      isSucceed: true,
    }
  }
}

module.exports = CourseSystemController;