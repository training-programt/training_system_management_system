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
    console.log(approval)
    ctx.body = {
      data: approval,
      code: 200,
      message: '已新增数据',
      isSucceed: true,
    }
  }
   //添加审核表
   async addAudit() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log(params)
    const strandard = await ctx.model.Achievement.insertMany(params.arr);
    // console.log(strandard)
    const approval = await ctx.service.teachingTeacher.addAudit(
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
}

module.exports = TeachingTeacherController;