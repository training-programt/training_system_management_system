'use strict';
const Controller = require('egg').Controller;

class TableController extends Controller {
  async majorObjReqRelation() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.table.createMajorObjReqRelation(params)
    if (res) {
      const data = {
        _id: params.projectId,
        majorObjReqRelation: res._id
      }
      await ctx.service.trainingProject.updateProject(data)

      ctx.body = {
        total: 0,
        data: res,
        code: 200,
        isSucceed: true,
      }
    } else {
      ctx.body = {
        total: 0,
        message: '保存失败',
        code: 200,
        isSucceed: false,
      }
    }

  }


  async majorNationCoverRelation() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.table.createMajorNationCoverRelation(params)
    if (res) {
      const data = {
        _id: params.projectId,
        majorNationCoverRelation: res._id
      }
      await ctx.service.trainingProject.updateProject(data)

      ctx.body = {
        total: 0,
        data: res,
        code: 200,
        isSucceed: true,
      }
    } else {
      ctx.body = {
        total: 0,
        message: '保存失败',
        code: 200,
        isSucceed: false,
      }
    }

  }



}

module.exports = TableController;