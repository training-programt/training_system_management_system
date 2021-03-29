'use strict';
const Controller = require('egg').Controller;

class AuditController extends Controller {
  async getAudit() {
    const { ctx } = this;
    const params = ctx.request.query;
    const data = await ctx.service.audit.getAudit(params);
    const count = await ctx.service.audit.getCount();
    ctx.body = {
      total: count,
      data: data,
      code: 200,
      isSucceed: true,
    };
  }

  async addAudit() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.audit.addAudit(params)
    const count = await ctx.service.audit.getCount();
    ctx.body = {
      total: count,
      data: res,
      code: 200,
      isSucceed: true,
    };
  }

  async delAudit() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.audit.delAudit(params)
    const count = await ctx.service.audit.getCount();
    ctx.body = {
      total: count,
      data: res,
      code: 200,
      isSucceed: true,
    };
  }

  async updateAudit() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.audit.updateAudit(params)
    const count = await ctx.service.audit.getCount();
    ctx.body = {
      total: count,
      data: res,
      code: 200,
      isSucceed: true,
    };
  }

  async delMoreAudit() {
    const { ctx } = this;
    const params = ctx.request.body;
    const data = params.ids.split(',');
    const res = await ctx.service.audit.delMoreAudit(data)
    const count = await ctx.service.audit.getCount();
    ctx.body = {
      total: count,
      data: res,
      code: 200,
      isSucceed: true,
    };
  }

  async getAllAudit() {
    const { ctx } = this;
    const res = await ctx.service.audit.getAllAudit();
    ctx.body = {
      total: res.length,
      data: res,
      code: 200,
      isSucceed: true,
    }
  }
}

module.exports = AuditController;