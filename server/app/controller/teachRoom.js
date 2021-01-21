'use strict';
const Controller = require('egg').Controller;
 
class TeachRoomController extends Controller {
  async getTeachRoom() {
    const { ctx } = this;
    const data = await ctx.service.teachRoom.getTeachRoom()
    ctx.body = {
      total: data.length,
      data: data,
      code: 200,
      isSucceed: true,
    }
  }
}
 
module.exports = TeachRoomController;