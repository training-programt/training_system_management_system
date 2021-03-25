'use strict';
const Controller = require('egg').Controller;

class TeachingInfoController extends Controller {
  async getTeachingInfo() {
    const { ctx } = this;
    const params = ctx.request.query;
    const data = await ctx.service.teachingInfo.getTeachingInfo(params);
    const count = await ctx.service.teachingInfo.getCount();
    ctx.body = {
      total: count,
      data: data,
      code: 200,
      isSucceed: true,
    };
  }

  async addTeachingInfo() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.teachingInfo.addTeachingInfo(params)
    if(res) {
      const count = await ctx.service.teachingInfo.getCount();
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

  async delTeachingInfo() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.teachingInfo.delTeachingInfo(params)
    const count = await ctx.service.teachingInfo.getCount();
    ctx.body = {
      total: count,
      data: res,
      code: 200,
      isSucceed: true,
    };
  }

  async updateTeachingInfo() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.teachingInfo.updateTeachingInfo(params)
    const count = await ctx.service.teachingInfo.getCount();
    ctx.body = {
      total: count,
      data: res,
      code: 200,
      isSucceed: true,
    };
  }

  async delMoreTeachingInfo() {
    const { ctx } = this;
    const params = ctx.request.body;
    const data = params.ids.split(',');
    const res = await ctx.service.teachingInfo.delMoreTeachingInfo(data)
    const count = await ctx.service.teachingInfo.getCount();
    ctx.body = {
      total: count,
      data: res,
      code: 200,
      isSucceed: true,
    };
  }

  async getAllTeachingInfo() {
    const { ctx } = this;
    const res = await ctx.service.teachingInfo.getAllTeachingInfo();
    ctx.body = {
      total: res.length,
      data: res,
      code: 200,
      isSucceed: true,
    }
  }

  async getTeachingInfoByTeacher() {
    const { ctx } = this;
    const params = ctx.request.query;
    const res = await ctx.service.teachingInfo.getTeachingInfoByTeacher(params);
    ctx.body = {
      total: res.length,
      data: res,
      code: 200,
      isSucceed: true,
    }
  }
}

module.exports = TeachingInfoController;