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
  //添加课程大纲
  async addSyllabus() {
    const { ctx } = this;
    const params = ctx.request.body;
    const detailCourse = await ctx.model.DetailCourse.create({
      course: params.course_info.name._id,
      englishName: params.course_info.englishName,
      unit: params.course_info.unit._id,
      header: params.writer,
      category: params.course_info.type,
      professional: params.course_info.professional._id,
      course_ap: params.course_info.course_ap,
      introduce: params.course_info.introduce
    })
    // console.log(detailCourse)
    // console.log(params.relation)
    const teachGoal = await ctx.model.TeachingGoal.insertMany(params.teaching_goal)
    // console.log(teachGoal)
    let newArr = [];
    params.relation.forEach((relation) => {
      teachGoal.forEach((item,index) => {
        newArr.push({
          major_requirement: relation.major_requirement._id,
          point: relation.point._id,
          teach_goal: item._id,
          weight:relation.teach_goal[index]
        })
      })
    })
    const relation = await ctx.model.Relation.insertMany(newArr)
    console.log(relation)
    const theory = await ctx.model.TheoryTeach.insertMany(params.theory_teaching)
    console.log(theory)
    const pratice = await ctx.model.PracticeTeach.insertMany(params.practice_teaching)
    console.log(pratice)
    let assessmentArr=[];
    params.assessmentGoal.forEach((ass) => {
      params.assessment.forEach((item,index) => {
        assessmentArr.push({
          teaching_goal: ass.teaching_goal._id,
          major_requirement: ass.major_requirement._id,
          assessment: item._id,
          status:ass.assessment[index]
        })
      })
    })
    const assessmentGoal = await ctx.model.AssessmentGoal.insertMany(assessmentArr)
    console.log(assessmentGoal)
    const data = await ctx.service.courseLeader.createSyllabus({
      course_info:detailCourse._id,
      teaching_goal: teachGoal.map(item => item._id),
      relation:relation.map(item=>item._id),
      theory_teaching:theory.map(item=>item._id),
      practice_teaching:pratice.map(item=>item._id),
      assessment:params.assessment.map(item=>item._id),
      assessmentGoal:assessmentGoal.map(item=>item._id),
      reference:params.reference.map(item=>item._id),
      instructions:params.instructions,
      writer:params.writer,
      reviewer:params.reviewer,
      modify_data:new Date(params.modify_data)
    })
    console.log(data)
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
    const data = await ctx.model.Teacher.find({ _id: params._id })
      .populate('course')
      .populate('header')
      .sort();
    console.log(data)
    // const syllabus = await ctx.model.Syllabus.find({ course_info: data[0].course})
    // .populate('course_info')
    // .populate('teaching_goal')
    // .populate('theory_teaching')
    // .populate('practice_teaching')
    // .populate('assessment')
    // .populate('reviewer')
    // .sort('sort');
    ctx.body = {
      total: data.length,
      data: data,
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
  async delTeachGoal() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.courseLeader.delTeachGoal({ _id: params._id })
    console.log(res)
    if (res.n !== 0) {
      ctx.body = {
        total: res.length,
        data: res,
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
  async addRelation() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log(params)
    // const find = await ctx.service.courseLeader.findRelation(
    //   { target_course_name: params.target_course_name }
    // )
    // console.log(find)
    // const res = await ctx.service.courseLeader.addTeachGoal(params)
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