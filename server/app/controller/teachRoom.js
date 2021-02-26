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

    const res = await ctx.service.teachRoom.addTeachRoom(params);
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

  async updateTeachRoom() {
    const { ctx } = this;
    const params = ctx.request.body;

    const res = await ctx.service.teachRoom.updataTeachRoom(params);

    if (res) {
      ctx.body = {
        total: 0,
        data: res,
        message: '修改成功',
        code: 200,
        isSucceed: true,
      };
    } else {
      ctx.body = {
        total: 0,
        message: '修改失败',
        code: 200,
        isSucceed: false,
      };
    }
  }

  async delTeachRoom() {
    const { ctx } = this;

    const params = ctx.request.body;

    const res = await ctx.service.teachRoom.delTeachRoom({_id: params._id})

    if (res) {
      ctx.body = {
        total: 0,
        data: res,
        message: '删除成功',
        code: 200,
        isSucceed: true,
      };
    } else {
      ctx.body = {
        total: 0,
        message: '删除失败',
        code: 200,
        isSucceed: false,
      };
    }
  }
} 

module.exports = TeachRoomController;
