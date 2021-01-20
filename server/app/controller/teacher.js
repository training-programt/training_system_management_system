'use strict';
const Controller = require('egg').Controller;

class TeacherController extends Controller {
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
  async addTeacher() {
    const { ctx } = this;

    let params = await ctx.request.body;
    params.birthday.slice(0,7)
    console.log(params)
    const teachers = await ctx.service.teacher.addTeacher(params)
    if(teachers.length>=0){
      ctx.body = {
        total: teachers.length,
        data: teachers,
        code: 200,
        isSucceed: true,
        message: '新增成功',
      }
    }else{
      ctx.body = {
        code: 500,
        isSucceed: false,
        message: '新增失败',
      }
    }
   

  }

  async delTeacher() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.teacher.delTeacher(params)
    // console.log(res)
    if(res.ok==1){
      ctx.body = {
        code: 200,
        isSucceed: true,
        message:'删除成功'
      };
    }else{
      ctx.body = {
        code: 500,
        isSucceed: false,
        message:'删除失败'
      };
    }
   
  }
  async updataTeacher() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log(params)
    const data = await ctx.model.Teacher.findByIdAndUpdate(
      { _id: params._id },
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
  async queryTeacher() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log(params)
    const reg = new RegExp(params.name, 'i')
    const res = await ctx.model.Teacher.find(
     {
       $and:[
        { name: { $regex: reg } },
        { job: params.job },
        { teachRoom: params.teachRoom||''},
        { position: params.position }
       ]
     } 
    );
    ctx.body = {
      total: res.length,
      data: res,
      code: 200,
      isSucceed: true,
      message: '查询成功',
    };
  }
}

module.exports = TeacherController;