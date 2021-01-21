'use strict';
const Controller = require('egg').Controller;
 
class CourseController extends Controller {
  async getCourse() {
    const { ctx } = this;
    const data = await ctx.service.course.getCourse()
    ctx.body = {
      total: data.length,
      data: data,
      code: 200,
      isSucceed: true,
    }

  }
}
 
module.exports = CourseController;