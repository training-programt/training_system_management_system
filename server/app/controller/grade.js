'use strict';
const Controller = require('egg').Controller;
 
class GradeController extends Controller {
  async getGrade() {
    const { ctx } = this;
    const data = await ctx.service.grade.getGrade()
    // console.log(data)
    ctx.body = {
      total: data.length,
      data: data,
      code: 200,
      isSucceed: true,
    }

  }
  async getSemester() {
    const { ctx } = this;
    const data = await ctx.service.grade.getSemester()
    ctx.body = {
      total: data.length,
      data: data,
      code: 200,
      isSucceed: true,
    }

  }
  async getCollege() {
    const { ctx } = this;
    const data = await ctx.service.grade.getCollege()
    ctx.body = {
      total: data.length,
      data: data,
      code: 200,
      isSucceed: true,
    }

  }
}
 
module.exports = GradeController;