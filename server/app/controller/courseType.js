'use strict';
const Controller = require('egg').Controller;

class CourseTypeController extends Controller {
  async getCourseType() {
    const { ctx } = this;
    const params = ctx.request.query;
    const data = await ctx.service.courseType.getCourseType(params);
    const count = await ctx.service.courseType.getCount();
    ctx.body = {
      total: count,
      data: data,
      code: 200,
      isSucceed: true,
    };
  }

  async addCourseType() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.courseType.addCourseType(params)
    const count = await ctx.service.courseType.getCount();
    ctx.body = {
      total: count,
      data: res,
      code: 200,
      isSucceed: true,
    };
  }

  async delCourseType() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.courseType.delCourseType(params)
    const count = await ctx.service.courseType.getCount();
    ctx.body = {
      total: count,
      data: res,
      code: 200,
      isSucceed: true,
    };
  }

  async updateCourseType() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.courseType.updateCourseType(params)
    const count = await ctx.service.courseType.getCount();
    ctx.body = {
      total: count,
      data: res,
      code: 200,
      isSucceed: true,
    };
  }

  async delMoreCourseType() {
    const { ctx } = this;
    const params = ctx.request.body;
    const data = params.ids.split(',');
    const res = await ctx.service.courseType.delMoreCourseType(data)
    const count = await ctx.service.courseType.getCount();
    ctx.body = {
      total: count,
      data: res,
      code: 200,
      isSucceed: true,
    };
  }

  async getAllCourseType() {
    const { ctx } = this;
    const res = await ctx.service.courseType.getAllCourseType();
    ctx.body = {
      total: res.length,
      data: res,
      code: 200,
      isSucceed: true,
    }
  }
}

module.exports = CourseTypeController;