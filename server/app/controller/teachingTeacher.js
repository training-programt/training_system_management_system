'use strict';
const Controller = require('egg').Controller;

class TeachingTeacherController extends Controller {

  //添加审批表
  async addApproval() {
    const { ctx } = this;
    const params = ctx.request.body;
    // console.log(params)
    const strandard = await ctx.model.Standard.insertMany(params.arr);
    // console.log(strandard)
    const approval = await ctx.service.teachingTeacher.addApproval(
      {
        course: params.course,
        inspectionForm: params.inspectionForm,
        estimatePassRate: params.estimatePassRate,
        inspectionObject: params.inspectionObject,
        studentNum: params.studentNum,
        estimateAverage: params.estimateAverage,
        standard: strandard.map(item => item._id)
      }
    );
    if (Object.keys(approval).length) {
      ctx.body = {
        data: approval,
        code: 200,
        message: '已新增数据',
        isSucceed: true,
      }
    } else {
      ctx.body = {
        code: 500,
        message: '新增失败',
        isSucceed: false,
      }
    }


  }
  async getApproval() {
    const { ctx } = this;
    const approval = await ctx.service.teachingTeacher.getApproval({});
    // console.log(approval)
    ctx.body = {
      data: approval,
      code: 200,
      isSucceed: true,
    }
  }

  async getApprovalById() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.teachingTeacher.getApprovalById(params);
    ctx.body = {
      total: 1,
      data: res,
      code: 200,
      isSucceed: true,
    }
  }

  async getAuditById() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.teachingTeacher.getAuditById(params);
    ctx.body = {
      total: 1,
      data: res,
      code: 200,
      isSucceed: true,
    }
  }

  async getApprovalWithPage() {
    const { ctx } = this;
    const params = ctx.request.query;
    const res = await ctx.service.teachingTeacher.getApprovalWithPage(params);
    const count = await ctx.service.teachingTeacher.getApprovalCount();
    ctx.body = {
      total: count,
      data: res,
      code: 200,
      isSucceed: true
    }
  }

  async getAuidtWithPage() {
    const { ctx } = this;
    const params = ctx.request.query;
    const res = await ctx.service.teachingTeacher.getAuditWithPage(params);
    const count = await ctx.service.teachingTeacher.getAuditCount();
    ctx.body = {
      total: count,
      data: res,
      code: 200,
      isSucceed: true
    }
  }


  async findApproval() {
    const { ctx } = this;
    const params = ctx.request.body
    const app = await ctx.service.teachingTeacher.findApproval({course:params._id});
    // console.log(audit)
    ctx.body = {
      data: app,
      code: 200,
      isSucceed: true,
    }
  }
  async delApproval() {
    const { ctx } = this;
    const params = ctx.request.body
    console.log(params)
    const app = await ctx.service.teachingTeacher.delApproval({_id:params.data._id});
    console.log(app)
    const delStandard = await ctx.model.Standard.deleteMany({_id:{$in:params.data.standard}});
    console.log(app)
    if(app.n===1){
      ctx.body = {
        data: app,
        code: 200,
        isSucceed: true,
      }
    }else{
      ctx.body = {
        code: 500,
        isSucceed: false,
      }
    }
   
  }
   //添加审核表
   async addAudit() {
    const { ctx } = this;
    const params = ctx.request.body;
    // console.log(params)
    const achievement = await ctx.model.Achievement.insertMany(params.arr);
    // console.log(achievement)
    const audit = await ctx.service.teachingTeacher.addAudit(
      {
        course: params._id,
        achievement: achievement.map(item => item._id),
        description:params.description,
        isAchievement:params.isAchievement,
      }
    );
    if (Object.keys(audit).length) {
      ctx.body = {
        data: audit,
        code: 200,
        message: '已新增数据',
        isSucceed: true,
      }
    } else {
      ctx.body = {
        code: 500,
        message: '新增失败',
        isSucceed: false,
      }
    }


  }
  async getAudit() {
    const { ctx } = this;
    const audit = await ctx.service.teachingTeacher.getAudit({});
    // console.log(audit)
    ctx.body = {
      data: audit,
      code: 200,
      isSucceed: true,
    }
  }
  async findAudit() {
    const { ctx } = this;
    const params = ctx.request.body
    const audit = await ctx.service.teachingTeacher.findAudit({course:params._id});
    // console.log(audit)
    ctx.body = {
      data: audit,
      code: 200,
      isSucceed: true,
    }
  }
  async delAudit() {
    const { ctx } = this;
    const params = ctx.request.body
    // console.log(params)
    const audit = await ctx.service.teachingTeacher.delAudit({_id:params.data._id});
    console.log(audit)
    const delAchievement = await ctx.model.Achievement.deleteMany({_id:{$in:params.data.achievement}});
    console.log(delAchievement)
    if(audit.n===1){
      ctx.body = {
        data: audit,
        code: 200,
        isSucceed: true,
      }
    }else{
      ctx.body = {
        code: 500,
        isSucceed: false,
      }
    }
   
  }

  async updateApprovalOpinion() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log(params)
    const data = await ctx.service.teachingTeacher.updateApprovalOpinion(params);
    ctx.body = {
      total: 1,
      data: data,
      code: 200,
      isSucceed: true,
    }
  }
  async updateAuditOpinion() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log(params)
    const data = await ctx.service.teachingTeacher.updateAuditOpinion(params);
    ctx.body = {
      total: 1,
      data: data,
      code: 200,
      isSucceed: true,
    }
  }
}

module.exports = TeachingTeacherController;