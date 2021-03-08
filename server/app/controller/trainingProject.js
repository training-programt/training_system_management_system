'use strict';
const Controller = require('egg').Controller;
 
class TrainingProjectController extends Controller {

  async getProjectList() {
    const { ctx } = this;
    const res = await ctx.service.trainingProject.getProjectList()
    if(res) {
      ctx.body = {
        total: 0,
        data: res,
        code: 200,
        isSucceed: true,
      }
    }
  }
  
  async createProject() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log(params)
    const res = await ctx.service.trainingProject.createProject(params)
    if(res) {
      ctx.body = {
        total: 0,
        data: res,
        code: 200,
        isSucceed: true,
      }
    }
  }

  async updateProject() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log(params)
    const res = await ctx.service.trainingProject.updateProject(params)
    if(res) {
      ctx.body = {
        total: 0,
        data: res,
        code: 200,
        isSucceed: true,
      }
    }
  }

  async updateObject() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log(params)
    let res;
    if(params.objectId) {
      res = await ctx.service.trainingObjective.updateObject(params)
    } else {
      res = await ctx.service.trainingObjective.createObject(params)
      const data = {
        _id: params._id,
        trainingObjective: res._id
      }
      await ctx.service.trainingProject.updateProject(data)
    }
    console.log(res)
    if(res) {
      ctx.body = {
        total: 0,
        data: res,
        code: 200,
        isSucceed: true,
      }
    }
  }

  async updateRequirement() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log(params)
    let res;
    if(params.requirementId) {
      res = await ctx.service.graduationRequirement.updateRequirement(params)
    } else {
      res = await ctx.service.graduationRequirement.createRequirement(params)
      const data = {
        _id: params._id,
        graduationRequirement: res._id
      }
      await ctx.service.trainingProject.updateProject(data)
    }
    console.log(res)
    if(res) {
      ctx.body = {
        total: 0,
        data: res,
        code: 200,
        isSucceed: true,
      }
    }
  }

  async delProject() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.trainingProject.delProject({ _id: params._id })
    if (res) {
      ctx.body = {
        total: 0,
        data: res,
        message: '删除成功',
        code: 200,
        isSucceed: true,
      };
    } else {
      ctx.body = {
        total: 0,
        message: '删除失败',
        code: 200,
        isSucceed: false,
      };
    }
  }
  
}
 
module.exports = TrainingProjectController;