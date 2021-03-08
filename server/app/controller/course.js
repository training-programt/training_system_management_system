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
  async addCourse() {
    const { ctx } = this;
    const params = ctx.request.body;
    if(params.degree==="是"){
      params.degree = true
    }else{
      params.degree = false
    }
    if(params.flag_fuse==="是"){
      params.flag_fuse = true
    }else{
      params.flag_fuse = false
    }
    const findCourse = await ctx.service.course.findCourse(
        {$or: [{name: params.name}, {code: params.code}]}
        )
    if(findCourse.length!=0){
        ctx.body = {
            message:'新增失败,已经存在相同课程名字或编码',
            code: 200,
            isSucceed: false,
        }; 
    }else{
        const res = await ctx.service.course.addCourse(params)
        if(params.header){
          const teacherChange = await ctx.model.Teacher.update(
            {_id:params.header},
            {
              $push: {
                course: res[0]._id
              }
            },
            )
        }
        if(params.system){
          const sysChange = await ctx.model.CourseSystem.update(
            {_id:params.system},
            {
              $push: {
                courses: res[0]._id
              }
            },
            )
        }
        if(params.unit){
          const collegeChange = await ctx.model.College.update(
            {_id:params.unit},
            {
              $push: {
                courseList: res[0]._id
              }
            },
            )
        }       
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
  async delCourse() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log(params)
    const data = await ctx.service.course.delCourse({_id:params._id})
    if (data.n==1) {
      ctx.body = {
          total: data.length,
          data: data,
          code: 200,
          isSucceed: true,
          message:'删除成功',
      };
  }else{
      ctx.body = {
          message:'删除失败',
          code: 200,
          isSucceed: false,
      };  
  }
  }
  async getCourseSystem() {
    const { ctx } = this;
    const data = await ctx.service.course.getCourseSystem()
    ctx.body = {
      total: data.length,
      data: data,
      code: 200,
      isSucceed: true,
    }

  }
}
 
module.exports = CourseController;