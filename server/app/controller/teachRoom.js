'use strict';
const Controller = require('egg').Controller;
 
class TeachRoomController extends Controller {
  async getTeachRoom() {
    const { ctx } = this;

    const params = ctx.request.query

    const data = await ctx.service.teachRoom.getTeachRoom(params)

    ctx.body = {
      total: data.length,
      data: data,
      code: 200,
      isSucceed: true,
    }
  }

  async getTeacherByRoom() {
    const { ctx } = this;

    const params = ctx.request.query

    const data = await ctx.service.teacher.getTeacherByRoom(params)

    ctx.body = {
      total: data.length,
      data: data,
      code: 200,
      isSucceed: true,
    }
  }
}
 
module.exports = TeachRoomController;