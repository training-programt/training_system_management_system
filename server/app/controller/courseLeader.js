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
    // console.log(params)
    const findDetailCourse = await ctx.model.DetailCourse.find({course:params.course_info.name._id})
    if(findDetailCourse.length!=0){
      ctx.body = {
        message: '新增失败,已经存在相同课程的教学大纲',
        code: 200,
        isSucceed: false,
      };
    }else{
      const detailCourse = await ctx.model.DetailCourse.create({
        course: params.course_info.name._id,
        englishName: params.course_info.englishName,
        unit: params.course_info.unit._id,
        header: params.writer,
        category: params.course_info.type,
        professional: params.course_info.professional.map(item=>item._id),
        course_ap: params.course_info.course_ap,
        introduce: params.course_info.introduce
      })
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
      const theory = await ctx.model.TheoryTeach.insertMany(params.theory_teaching)
      const pratice = await ctx.model.PracticeTeach.insertMany(params.practice_teaching)
      let assessmentArr=[];
      // console.log(params.assessmentGoal)
      params.assessmentGoal.forEach((ass) => {
        let teachId;
        teachGoal.map(item=>{
          if(item.target_course_name==ass.teaching_goal.target_course_name)
          {
            teachId = item._id
          }
        })
        params.assessment.forEach((item,index) => {
          assessmentArr.push({
            teaching_goal:teachId,
            major_requirement: ass.major_requirement._id,
            assessment: item._id,
            status:ass.assessment[index]
          })
        })
      })
      const assessmentGoal = await ctx.model.AssessmentGoal.insertMany(assessmentArr)
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
        status:params.status,
        modify_data:new Date(params.modify_data)
      })
      if(data){
        ctx.body = {
          code: 200,
          isSucceed: true,
          message:"提交成功，已存入数据"
        }
      }else{
        ctx.body = {
          code: 500,
          isSucceed: false,
          message:'新增失败'
        }
      }

    }
  }
  async updateSyllabus() {
    const { ctx } = this;
    const params = ctx.request.body;
    const find = await ctx.service.courseLeader.findSyllabus({ _id: params._id });
    const delTeachGoal = await ctx.model.TeachingGoal.remove({ _id: { $in: find[0].teaching_goal } });
    const delRelation = await ctx.model.Relation.remove({ _id: { $in: find[0].relation } });
    const delTheory = await ctx.model.TheoryTeach.remove({ _id: { $in: find[0].theory_teaching } });
    const delPracticeTeach = await ctx.model.PracticeTeach.remove({ _id: { $in: find[0].practice_teaching} });
    const delAssessmentGoal= await ctx.model.AssessmentGoal.remove({ _id: { $in: find[0].assessmentGoal} });
    const delCourse= await ctx.model.DetailCourse.remove({ _id: find[0].course_info});
    const delSyl= await ctx.model.Syllabus.remove({ _id: params._id});


    const detailCourse = await ctx.model.DetailCourse.create({
      course: params.course_info.name._id,
      englishName: params.course_info.englishName,
      unit: params.course_info.unit._id,
      header: params.writer,
      category: params.course_info.type,
      professional: params.course_info.professional.map(item=>item._id),
      course_ap: params.course_info.course_ap,
      introduce: params.course_info.introduce
    })
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
    const theory = await ctx.model.TheoryTeach.insertMany(params.theory_teaching)
    const pratice = await ctx.model.PracticeTeach.insertMany(params.practice_teaching)
    let assessmentArr=[];
    // console.log(params.assessmentGoal)
    params.assessmentGoal.forEach((ass) => {
      let teachId;
      teachGoal.map(item=>{
        if(item.target_course_name==ass.teaching_goal.target_course_name)
        {
          teachId = item._id
        }
      })
      params.assessment.forEach((item,index) => {
        assessmentArr.push({
          teaching_goal:teachId,
          major_requirement: ass.major_requirement._id,
          assessment: item._id,
          status:ass.assessment[index]
        })
      })
    })
    const assessmentGoal = await ctx.model.AssessmentGoal.insertMany(assessmentArr)
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
      status:params.status,
      modify_data:new Date(params.modify_data)
    })
    // console.log(data)
    if(find.length!==0 && data){
      ctx.body = {
        code: 200,
        message:"修改成功",
        isSucceed: true,
      }
    }else{
      ctx.body = {
        code: 500,
        message:"修改失败",
        isSucceed: false,
      }
    }
   
  }
  async delSyllabus() {
    const { ctx } = this;
    const params = ctx.request.body;
    const find = await ctx.service.courseLeader.findSyllabus({ _id: params._id });
    const delTeachGoal = await ctx.model.TeachingGoal.remove({ _id: { $in: find[0].teaching_goal } });
    const delRelation = await ctx.model.Relation.remove({ _id: { $in: find[0].relation } });
    const delTheory = await ctx.model.TheoryTeach.remove({ _id: { $in: find[0].theory_teaching } });
    const delPracticeTeach = await ctx.model.PracticeTeach.remove({ _id: { $in: find[0].practice_teaching} });
    const delAssessmentGoal= await ctx.model.AssessmentGoal.remove({ _id: { $in: find[0].assessmentGoal} });
    const delCourse= await ctx.model.DetailCourse.remove({ _id: find[0].course_info});
    const delSyl= await ctx.model.Syllabus.remove({ _id: params._id});
    if(find.length!==0){
      ctx.body = {
        data:delSyl,
        code: 200,
        message:"已成功删除该课程大纲及相关数据",
        isSucceed: true,
      }
    }else{
      ctx.body = {
        code: 500,
        message:"删除失败",
        isSucceed: false,
      }
    }
   
  }
  //查找对应的课程大纲
  async findSyllabus() {
    const { ctx } = this;
    let params = await ctx.request.body;
    // console.log(params)
    try {
      const detail = await ctx.model.DetailCourse.find({ course: params.courseSystemId })
      // console.log(detail[0]._id)
      const findSyll = await ctx.model.Syllabus.find({ course_info: detail[0]._id })
      // console.log(findSyll)
      if(findSyll.length!=0){
        ctx.body = {
          total: findSyll.length,
          data: findSyll,
          code: 200,
          isSucceed: true,
        }
      }
    } catch (error) {
        ctx.body = {
          code: 200,
          message:'暂未编辑教学大纲',
          isSucceed: false,
      }
    }
   
   

  }
  
  async findSyllabusById(){
    const { ctx } = this;
    let params = await ctx.request.body;
    const data = await ctx.service.courseLeader.findSyllabus({_id:params._id})
    console.log(data)
    if(data){
      ctx.body = {
        total: data.length,
        data: data,
        code: 200,
        isSucceed: true,
      }
    }else{
      ctx.body = {
        message:'不存在该教学大纲',
        code: 500,
        isSucceed: false,
      }
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
    // console.log(res)
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
    // console.log(params)
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
  //得到对应关系
  async getGoalAndAssessment(){
    const { ctx } = this;
    const data = await ctx.model.AssessmentGoal.find({status:"√"})
    
    .populate('major_requirement')
    .sort({'major_requirement':1})
    .populate('teaching_goal')
    .sort({'teaching_goal':1})
    .populate('assessment')
    // .sort({"major_requirement":1,"teaching_goal":1})
    ctx.body = {
      total: data.length,
      data: data,
      code: 200,
      isSucceed: true,
    }

  }
}

module.exports = CourseLeaderController;