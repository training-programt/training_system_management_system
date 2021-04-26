'use strict';
const Controller = require('egg').Controller;

class TeachingTeacherController extends Controller {

  //添加审批表
  async addApproval() {
    const { ctx } = this;
    const params = ctx.request.body;
    const findApproval = await ctx.model.Approval.find({ course: params.course })
    console.log(findApproval)
    if (findApproval.length != 0) {
      ctx.body = {
        code: 200,
        message: '已经存在该课程的审批表',
        isSucceed: false,
      }
    } else{
      // const strandard = await ctx.model.Standard.insertMany(params.arr);
      // const approval = await ctx.service.teachingTeacher.addApproval(
      //   {
      //     course: params.course,
      //     inspectionForm: params.inspectionForm,
      //     estimatePassRate: params.estimatePassRate,
      //     inspectionObject: params.inspectionObject,
      //     studentNum: params.studentNum,
      //     estimateAverage: params.estimateAverage,
      //     standard: strandard.map(item => item._id)
      //   }
      // );
      if (Object.keys(approval).length) {
        ctx.body = {
          data: approval,
          code: 200,
          message: '已新增审批表数据并存入数据库',
          isSucceed: true,
        }
      } else {
        ctx.body = {
          code: 500,
          message: '新增审批表失败失败',
          isSucceed: false,
        }
      }  
    }
  }
  async getApproval() {
    const { ctx } = this;
    const approval = await ctx.service.teachingTeacher.getApproval({});
    ctx.body = {
      data: approval,
      code: 200,
      isSucceed: true,
    }
  }
  async findApproval() {
    const { ctx } = this;
    const params = ctx.request.body
    const app = await ctx.service.teachingTeacher.findApproval({ course: params._id });
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
    const app = await ctx.service.teachingTeacher.delApproval({ _id: params.data._id });
    console.log(app)
    const delStandard = await ctx.model.Standard.deleteMany({ _id: { $in: params.data.standard } });
    console.log(app)
    if (app.n === 1) {
      ctx.body = {
        data: app,
        code: 200,
        isSucceed: true,
      }
    } else {
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
    const findAduit = await ctx.model.Audit.find({ course: params._id })
    // console.log(findAduit)
    if (findAduit.length != 0) {
      ctx.body = {
        code: 200,
        message: '已经存在该课程的审核表',
        isSucceed: false,
      }
    } else {
      const achievement = await ctx.model.Achievement.insertMany(params.arr);
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
          message: '已新增审核表数据,并存入数据库',
          isSucceed: true,
        }
      } else {
        ctx.body = {
          code: 500,
          message: '新增审核表失败',
          isSucceed: false,
        }
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
    const audit = await ctx.service.teachingTeacher.findAudit({ course: params._id });
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
    const audit = await ctx.service.teachingTeacher.delAudit({ _id: params.data._id });
    console.log(audit)
    const delAchievement = await ctx.model.Achievement.deleteMany({ _id: { $in: params.data.achievement } });
    console.log(delAchievement)
    if (audit.n === 1) {
      ctx.body = {
        data: audit,
        code: 200,
        isSucceed: true,
      }
    } else {
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