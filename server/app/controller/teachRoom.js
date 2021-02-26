"use strict";
const Controller = require("egg").Controller;

class TeachRoomController extends Controller {
  async getTeachRoom() {
    const { ctx } = this;

    const params = ctx.request.query;

    const data = await ctx.service.teachRoom.getTeachRoom(params);

    ctx.body = {
      total: data.length,
      data: data,
      code: 200,
      isSucceed: true,
    };
  }

  async getTeacherByRoom() {
    const { ctx } = this;

    const params = ctx.request.query;

    console.log(params);

    const data = await ctx.service.teacher.getTeacherByRoom(params);

    ctx.body = {
      total: data.length,
      data: data,
      code: 200,
      isSucceed: true,
    };
  }

  async addTeachRoom() {
    const { ctx } = this;

    const params = ctx.request.body;
    console.log(params)

    const res = await ctx.service.teachRoom.addTeachRoom(params);
    console.log(res);
    if (res) {
      ctx.body = {
        total: 0,
        data: res,
        message: '新增成功',
        code: 200,
        isSucceed: true,
      };
    } else {
      ctx.body = {
        total: 0,
        message: '新增失败',
        code: 200,
        isSucceed: false,
      };
    }
  }
} 

module.exports = TeachRoomController;
