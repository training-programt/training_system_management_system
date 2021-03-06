'use strict';
const Controller = require('egg').Controller;
 
class GradeController extends Controller {
  async getGrade() {
    const { ctx } = this;
    const data = await ctx.service.grade.getGrade()
    ctx.body = {
      total: data.length,
      data: data,
      code: 200,
      isSucceed: true,
    }

  }
  async addGrade(){
    const { ctx } = this;
    const params = ctx.request.body;
    console.log(params)
    const findGrade = await ctx.service.grade.findGrade(
        {name: params.name}
        )
    // console.log(findMajor)
    if(findGrade.length!=0){
        ctx.body = {
            message:'新增失败,已经存在相同年级名字',
            code: 200,
            isSucceed: false,
        }; 
    }else{
        const res = await ctx.service.grade.addGrade(params)
        if (res) {
            ctx.body = {
                total: res.length,
                data: res,
                code: 200,
                isSucceed: true,
                message:'新增成功',
            };
        }else{
            ctx.body = {
                message:'新增失败',
                code: 200,
                isSucceed: false,
            };  
        }
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
  async addSemester(){
    const { ctx } = this;
    const params = ctx.request.body;
    const findSemester = await ctx.service.grade.findSemester(
        {semesterName: params.semesterName}
        )
    if(findSemester.length!=0){
        ctx.body = {
            message:'新增失败,已经存在相同学期名字',
            code: 200,
            isSucceed: false,
        }; 
    }else{
        const res = await ctx.service.grade.addSemester(params)
        if (res) {
            ctx.body = {
                total: res.length,
                data: res,
                code: 200,
                isSucceed: true,
                message:'新增成功',
            };
        }else{
            ctx.body = {
                message:'新增失败',
                code: 200,
                isSucceed: false,
            };  
        }
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