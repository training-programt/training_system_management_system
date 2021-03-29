'use strict';
const Controller = require('egg').Controller;

class ApprovalController extends Controller {
  async getApproval() {
    const { ctx } = this;
    const params = ctx.request.query;
    const data = await ctx.service.approval.getApproval(params);
    const count = await ctx.service.approval.getCount();
    ctx.body = {
      total: count,
      data: data,
      code: 200,
      isSucceed: true,
    };
  }

  async addApproval() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.approval.addApproval(params)
    const count = await ctx.service.approval.getCount();
    ctx.body = {
      total: count,
      data: res,
      code: 200,
      isSucceed: true,
    };
  }

  async delApproval() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.approval.delApproval(params)
    const count = await ctx.service.approval.getCount();
    ctx.body = {
      total: count,
      data: res,
      code: 200,
      isSucceed: true,
    };
  }

  async updateApproval() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.approval.updateApproval(params)
    const count = await ctx.service.approval.getCount();
    ctx.body = {
      total: count,
      data: res,
      code: 200,
      isSucceed: true,
    };
  }

  async delMoreApproval() {
    const { ctx } = this;
    const params = ctx.request.body;
    const data = params.ids.split(',');
    const res = await ctx.service.approval.delMoreApproval(data)
    const count = await ctx.service.approval.getCount();
    ctx.body = {
      total: count,
      data: res,
      code: 200,
      isSucceed: true,
    };
  }

  async getAllApproval() {
    const { ctx } = this;
    const res = await ctx.service.approval.getAllApproval();
    ctx.body = {
      total: res.length,
      data: res,
      code: 200,
      isSucceed: true,
    }
  }
}

module.exports = ApprovalController;