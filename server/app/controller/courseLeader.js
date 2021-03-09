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
  //查找对应的课程大纲
  async findSyllabus() {
    const { ctx } = this;
    let params = await ctx.request.body;
    const data = await ctx.model.Teacher.find({_id:params._id});
    const syllabus = await ctx.model.Syllabus.find({ course_info: data[0].course})
    .populate('course_info')
    .populate('teaching_goal')
    .populate('theory_teaching')
    .populate('practice_teaching')
    .populate('assessment')
    .populate('reviewer')
    .sort('sort');
    ctx.body = {
      total: syllabus.length,
      data: syllabus,
      code: 200,
      isSucceed: true,
    }

  }
  //得到课程教学目标
  async getTeachGoal() {
    const { ctx } = this;
    const data = await ctx.service.courseLeader.getTeachGoal();
    ctx.body = {
      total: data.length,
      data: data,
      code: 200,
      isSucceed: true,
    }

  }
  async addTeachGoal() {
    const { ctx } = this;
    const params = ctx.request.body;
    const find = await ctx.service.courseLeader.findTeachGoal(
      { target_course_name: params.target_course_name }
    )
    // console.log(find)
    if (find.length != 0) {
      ctx.body = {
        message: '新增失败,已经存在相同名字的教学目标',
        code: 200,
        isSucceed: false,
      };
    } else {
      const res = await ctx.service.courseLeader.addTeachGoal(params)
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
  async delTeachGoal(){
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.courseLeader.delTeachGoal({_id:params._id})
    console.log(res)
    if (res.n !==0) {
        ctx.body = {
            total: res.length,
            data: res,
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
  //得到对应关系
  async getRelation() {
    const { ctx } = this;
    const data = await ctx.service.courseLeader.getRelation();
    ctx.body = {
      total: data.length,
      data: data,
      code: 200,
      isSucceed: true,
    }

  }

   //得到 专业要求
   async getMajorRequirement() {
    const { ctx } = this;
    const data = await ctx.service.courseLeader.getMajorRequirement();
    ctx.body = {
      total: data.length,
      data: data,
      code: 200,
      isSucceed: true,
    }

  }

   //得到指标点
   async getPoint() {
    const { ctx } = this;
    const data = await ctx.service.courseLeader.getPoint();
    ctx.body = {
      total: data.length,
      data: data,
      code: 200,
      isSucceed: true,
    }

  }
   //得到理论对应关系
   async getTheory() {
    const { ctx } = this;
    const data = await ctx.service.courseLeader.getTheory();
    ctx.body = {
      total: data.length,
      data: data,
      code: 200,
      isSucceed: true,
    }

  }
   //得到实践对应关系
   async getPractice() {
    const { ctx } = this;
    const data = await ctx.service.courseLeader.getPractice();
    ctx.body = {
      total: data.length,
      data: data,
      code: 200,
      isSucceed: true,
    }

  }
}

module.exports = CourseLeaderController;