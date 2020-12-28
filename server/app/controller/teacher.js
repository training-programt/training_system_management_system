'use strict';
const Controller = require('egg').Controller;
 
class TeacherController extends Controller {
  async addTeacher() {
    const { ctx } = this;
    
    const params = await ctx.request.body;
    const role = await ctx.model.Role.find({role: 'TEACHER_DIRECTOR'})

    params.role = role._id;

    const teacher = await ctx.model.Teacher.create(params)

    ctx.body = teacher

  }
  async getTeacher() {
    const { ctx } = this;
    const data = await ctx.service.teacher.getTeacher()

    ctx.body = {
      total: data.length,
      data: data,
      code: 200,
      isSucceed: true,
    }

  }
}
 
module.exports = TeacherController;