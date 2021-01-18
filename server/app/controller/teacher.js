'use strict';
const Controller = require('egg').Controller;
 
class TeacherController extends Controller {
  async addTeacher() {
    const { ctx } = this;
    
    const params = await ctx.request.body;
    // const role = await ctx.model.Role.find({role: 'TEACHER_DIRECTOR'})

    // params.role = role._id;
    // console.log(params)
    const teachers = await ctx.service.teacher.addTeacher(params)
    // console.log(teachers)

    ctx.body = {
      total: teachers.length,
      data: teachers,
      code: 200,
      isSucceed: true,
    }

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
  async delTeacher() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.teacher.delTeacher(params)
    ctx.body = {
      total: res.length,
      data: res,
      code: 200,
      isSucceed: true,
    };
  }
  async updataTeacher() {
    const { ctx } = this;
    const params = ctx.request.body;
    const data = await ctx.model.Teacher.findByIdAndUpdate(
      {_id:params._id},
      {
        $set: {
          name: params.name,
          password: params.password,
          role: params.role,
        }
      })
    ctx.body = {
      total: data.length,
      data: data,
      code: 200,
      isSucceed: true,
    }
  }
}
 
module.exports = TeacherController;