'use strict';
const Controller = require('egg').Controller;

class TrainingProjectController extends Controller {

  async getProjectList() {
    const { ctx } = this;
    const res = await ctx.service.trainingProject.getProjectList()
    if (res) {
      ctx.body = {
        total: 0,
        data: res,
        code: 200,
        isSucceed: true,
      }
    }
  }

  async getProjectDetail() {
    const { ctx } = this;
    const params = ctx.request.body
    const res = await ctx.service.trainingProject.getProjectDetail(params)
    if (res) {
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
    let res;
    if (params._id) {
      res = await ctx.service.trainingProject.updateProject(params)
    } else {
      res = await ctx.service.trainingProject.createProject(params)
    }
    if (res) {
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
    const res = await ctx.service.trainingProject.updateProject(params)
    if (res) {
      ctx.body = {
        total: 0,
        data: res,
        code: 200,
        isSucceed: true,
      }
    }
  }

  async getObjectData() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.trainingObjective.getObjectData(params);
    ctx.body = {
      total: 0,
      data: res,
      code: 200,
      isSucceed: true,
    }
  }

  async updateObject() {
    const { ctx } = this;
    const params = ctx.request.body;
    let res;
    if (params.objectId) {
      res = await ctx.service.trainingObjective.updateObject(params)
    } else {
      res = await ctx.service.trainingObjective.createObject(params)
      const data = {
        _id: params._id,
        trainingObjective: res._id
      }
      await ctx.service.trainingProject.updateProject(data)
    }
    if (res) {
      ctx.body = {
        total: 0,
        data: res,
        code: 200,
        isSucceed: true,
      }
    }
  }
  
  async getRequirementById() {
    const {  ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.graduationRequirement.getRequirementById(params)
    ctx.body = {
      total: 0,
      data: res,
      code: 200,
      isSucceed: true,
    }
  }

  async updateRequirement() {
    const { ctx } = this;
    const params = ctx.request.body;
    let res;
    if (params.requirementId) {
      for (let i = 0; i < params.majorRequirement.length; i++) {
        let point = params.majorRequirement[i].point;
        if (point.length) {
          let tempData = await ctx.service.point.addPoint(point)
          params.majorRequirement[i].point = tempData.map(item => item._id)
        } else {
          params.majorRequirement[i].point = []
        }
      }
      res = await ctx.service.graduationRequirement.updateRequirement(params)
    } else {
      for (let i = 0; i < params.majorRequirement.length; i++) {
        let point = params.majorRequirement[i].point;
        if (point.length) {
          let tempData = await ctx.service.point.addPoint(point)
          params.majorRequirement[i].point = tempData.map(item => item._id)
        } else {
          params.majorRequirement[i].point = []
        }
      }
      res = await ctx.service.graduationRequirement.createRequirement(params)
      const data = {
        _id: params._id,
        graduationRequirement: res._id
      }
      await ctx.service.trainingProject.updateProject(data)
    }
    if (res) {
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

  async getRowColData() {
    const { ctx } = this;
    const params = ctx.request.query;
    const data = await ctx.service.trainingProject.findObjAndReqByProject(params)
    const res = {
      row: data.graduationRequirement,
      col: data.trainingObjective,
    }
    ctx.body = {
      total: 0,
      data: res,
      code: 200,
      isSucceed: true,
    }
  }

  async getTable2RowCol() {
    const { ctx } = this;
    const params = ctx.request.query;
    const data = await ctx.service.trainingProject.findObjAndReqByProject(params)
    const nationReq = await ctx.service.nationalRequirement.getAllRequirement();
    const res = {
      row: data.graduationRequirement.majorRequirement,
      col: nationReq,
    }
    ctx.body = {
      total: 0,
      data: res,
      code: 200,
      isSucceed: true,
    }
  }
}

module.exports = TrainingProjectController;