'use strict';
const Controller = require('egg').Controller;
 
class CourseLeaderController extends Controller {
//得到课程大纲
  async getSyllabus() {
    const { ctx } = this;
    const data = await ctx.service.courseLeader.getSyllabus();
    ctx.body = {
      total: data.length,
      data: data,
      code: 200,
      isSucceed: true,
    }

  }
}
 
module.exports = CourseLeaderController;