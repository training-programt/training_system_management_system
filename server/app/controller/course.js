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
    if (params.degree === "是") {
      params.degree = true
    } else {
      params.degree = false
    }
    if (params.flag_fuse === "是") {
      params.flag_fuse = true
    } else {
      params.flag_fuse = false
    }
    const findCourse = await ctx.service.course.findCourse(
      { $or: [{ name: params.name }, { code: params.code }] }
    )
    if (findCourse.length != 0) {
      ctx.body = {
        message: '新增失败,已经存在相同课程名字或编码',
        code: 200,
        isSucceed: false,
      };
    } else {
      const res = await ctx.service.course.addCourse(params)
      if (params.header) {
        const teacherChange = await ctx.model.Teacher.update(
          { _id: params.header },
          {
            $push: {
              course: res[0]._id
            }
          },
        )
      }
      if (params.system) {
        const sysChange = await ctx.model.CourseSystem.update(
          { _id: params.system },
          {
            $push: {
              courses: res[0]._id
            }
          },
        )
      }
      if (params.unit) {
        const collegeChange = await ctx.model.College.update(
          { _id: params.unit },
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
          message: '新增成功',
        };
      } else {
        ctx.body = {
          message: '新增失败',
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
    const data = await ctx.service.course.delCourse({ _id: params._id })
    if (data.n == 1) {
      ctx.body = {
        total: data.length,
        data: data,
        code: 200,
        isSucceed: true,
        message: '删除成功',
      };
    } else {
      ctx.body = {
        message: '删除失败',
        code: 200,
        isSucceed: false,
      };
    }
  }
  async updateCourse() {
    const { ctx } = this;
    const params = ctx.request.body;
    // console.log(params)
    const find  = await ctx.service.course.findCourse({_id:params._id})
    // console.log(find)
    if(params.unit!==find[0].unit){
      const collegeChange = await ctx.model.College.update(
        { _id: find[0].unit },
        {
          $pull: {
            courseList: params._id
          }
        },
      )
      const newChange = await ctx.model.College.update(
        { _id: params.unit },
        {
          $push: {
            courseList: params._id
          }
        },
      )
    }
    if(params.header!==find[0].header){
      const teacherChange = await ctx.model.Teacher.update(
        { _id: find[0].header },
        {
          $pull: {
            course: params._id
          }
        },
      )
      const newChange = await ctx.model.Teacher.update(
        { _id: params.header },
        {
          $push: {
            course: params._id
          }
        },
      )
    }
    if(params.system!==find[0].system){
      const sysChange = await ctx.model.CourseSystem.update(
        { _id: find[0].system },
        {
          $pull: {
            courses: params._id
          }
        },
      )
      const newChange = await ctx.model.CourseSystem.update(
        { _id: params.system },
        {
          $push: {
            courses: params._id
          }
        },
      )
    }
    const res = await ctx.model.Course.update(
      { _id: params._id },
      {
        $set: {
          _id: params._id,
          name: params.name,
          code: params.code,
          header: params.header,
          unit: params.unit,
          type: params.type,
          semester: params.semester,
          weekly_hours: params.weekly_hours,
          within: params.within,
          outside: params.outside,
          computer: params.computer,
          other: params.other,
          nature: params.nature,
          attribute: params.attribute,
          category: params.category,
          degree: params.degree,
          direction: params.direction,
          system:params.system,
          course_selection_group: params.course_selection_group,
          assessment_method: params.assessment_method,
          flag_fuse: params.flag_fuse
        }
      }
    )
    if (res.n == 1) {
      ctx.body = {
        total: res.length,
        message: '修改成功',
        data: res,
        code: 200,
        isSucceed: true,
      };
    } else {
      ctx.body = {
        message: '修改失败',
        code: 200,
        isSucceed: false,
      };
    }
  }
  async updateCourse1() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log(params)
    const createSyllabus = await ctx.service.courseLeader.createSyllabus({course_info:params.name})
    console.log(createSyllabus)
    const find  = await ctx.service.course.findCourse({_id:params.name})
    console.log(find)
    if(params.unit!==find[0].unit){
      const collegeChange = await ctx.model.College.update(
        { _id: find[0].unit },
        {
          $pull: {
            courseList: params.name
          }
        },
      )
      const newChange = await ctx.model.College.update(
        { _id: params.unit },
        {
          $push: {
            courseList: params.name
          }
        },
      )
    }
    const res = await ctx.model.Course.update(
      { _id: params.name },
      {
        $set: {
          _id: params.name,
          name: find[0].name,
          code: params.code,
          unit: params.unit,
          type: params.type,
          within: params.within,
          outside: params.outside,
          introduce:params.introduce,
          englishName:params.englishName,
          professional:params.professional,
          credits:params.credits,
          system:createSyllabus._id,
        }
      }
    )
    if (res.n == 1) {
      ctx.body = {
        total: res.length,
        message: '修改成功',
        data: res,
        code: 200,
        isSucceed: true,
      };
    } else {
      ctx.body = {
        message: '修改失败',
        code: 200,
        isSucceed: false,
      };
    }
  }
  async delMany(){
    const {ctx} = this;
    const params = ctx.request.body;
    const deleteMany = await ctx.service.course.delCourse({_id:{$in:params}})
   for(let i = 0;i<params.length;i++){
    const coll = await ctx.model.College.update(
      { _id: params[i].unit._id },
      {
        $pull:{
          courseList:params[i]._id
        }
      },
      { multi: true }
    )
    const cs = await ctx.model.CourseSystem.update(
      { _id: params[i].system._id },
      {
        $pull: {
          courses: params[i]._id
        }
      },
      { multi: true }
    )
    const major = await ctx.model.Teacher.update(
      { _id: params[i].header._id },
      {
        $pull: {
          course: params[i]._id
        }
      },
      { multi: true }
    )
   }
    
    if(deleteMany.ok==1){
      ctx.body = {
        total: deleteMany.length,
        data: deleteMany,
        code: 200,
        isSucceed: true,
        message: '删除成功'+deleteMany.deletedCount+'条数据',
      };
    }else{
      ctx.body = {
        code:500,
        isSucceed: true,
        message: '批量删除失败',
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

  async getAllCourse() {
    const { ctx } = this;
    const res = await ctx.service.course.getAllCourse()
    ctx.body = {
      total: res.length,
      data: res,
      code: 200,
      isSucceed: true,
    }
  }
}

module.exports = CourseController;