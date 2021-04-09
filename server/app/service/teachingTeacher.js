'use strict';
const Service = require('egg').Service;
class TeachingTeacherService extends Service {

  // 查询审批表
  async getApproval(params) {
    const { ctx } = this;
    const result = await ctx.model.Approval
      .find(params)
      .populate({
        path: 'course',
        populate: {
          path: 'course',
        }
      })
      .populate('standard')
      .sort('sort')
    return result;
  }
  // 删除
  async delApproval(params) {
    const { ctx } = this;
    const result = await ctx.model.Approval.remove(params)
    return result
  }
  async findApproval(params) {
    const { ctx } = this;
    const result = await ctx.model.Approval.find(params)
      .populate({
        path: 'course',
        populate: {
          path: 'course',
        }
      })
      .populate('standard')
      // .sort({})
      .sort('sort')
    return result
  }
  //修改
  async updateApproval(params) {
    const { ctx } = this;
    const result = await ctx.model.Approval.findByIdAndUpdate(params)
    return result
  }
  //增加
  async addApproval(params) {
    const { ctx } = this;
    const result = await ctx.model.Approval.create(params);
    return result;
  }
  // 查询审核表
  async getAudit(params) {
    const { ctx } = this;
    const result = await ctx.model.Audit
      .find(params)
      // .populate({
      //     path: 'course',
      //     populate: {
      //       path: 'course',
      //     }
      //   })
      .populate('course')
      .populate('achievement')
      .sort('sort')
    return result;
  }
  // 删除
  async delAudit(params) {
    const { ctx } = this;
    const result = await ctx.model.Audit.remove(params)
    return result
  }
  //修改
  async updateAudit(params) {
    const { ctx } = this;
    const result = await ctx.model.Audit.findByIdAndUpdate(params)
    return result
  }
  //增加
  async addAudit(params) {
    const { ctx } = this;
    const result = await ctx.model.Audit.create(params);
    return result;
  }
  // 查询审核表
  async getAudit(params) {
    const { ctx } = this;
    const result = await ctx.model.Audit
      .find(params)
      .populate({
        path: 'course',
        populate: {
          path: 'course',
        }
      })
      .populate('achievement')
      .sort('sort')
    return result;
  }
  async findAudit(params) {
    const { ctx } = this;
    const result = await ctx.model.Audit.find(params)
      .populate({
        path: 'course',
        populate: {
          path: 'course',
        }
      })
      .populate({
        path: 'course',
        populate: {
          path: 'major',
        }
      })
      .populate('achievement')
      .sort('sort')
    return result
  }

  async updateApprovalOpinion(params) {
    const { ctx } = this;
    const res = await ctx.model.Approval.findByIdAndUpdate(params._id, params)
    return res;
  }

  async updateAuditOpinion(params) {
    const { ctx } = this;
    const res = await ctx.model.Audit.findByIdAndUpdate(params._id, params)
    return res;
  }

  async getApprovalWithPage(params) {
    const { ctx } = this;
    const res = await ctx.model.Approval
      .find()
      .populate({
        path: 'course',
        populate: {
          path: 'course',
        }
      })
      .populate('standard')
      .limit(parseInt(params.pageSize))
      .skip(parseInt(params.pageSize) * (parseInt(params.page) - 1))
      .sort();
    return res;
  }

  async getApprovalCount() {
    const { ctx } = this;
    const count = await ctx.model.Approval.find().count();
    return count;
  }

  async getAuditWithPage(params) {
    const { ctx } =this;
    const res = await ctx.model.Audit
      .find()
      .populate({
          path: 'course',
          populate: {
            path: 'course',
          }
        })
      .populate('achievement')
      .limit(parseInt(params.pageSize))
      .skip(parseInt(params.pageSize) * (parseInt(params.page) - 1))
      .sort();
    return res;
  }

  async getAuditCount() {
    const { ctx } = this;
    const count = await ctx.model.Audit.find().count();
    return count;
  }

  async getApprovalById(params) {
    const { ctx } = this;
    const res = await ctx.model.Approval
      .findById(params._id)
      .populate({
        path: 'course',
        populate: {
          path: 'course',
        }
      })
      .populate('standard')
    return res;
  }
  async getAuditById(params) {
    const { ctx } = this;
    const res = await ctx.model.Audit
      .findById(params._id)
      .populate({
        path: 'course',
        populate: {
          path: 'course',
        }
      })
    .populate('achievement')
    return res;
  }
}
module.exports = TeachingTeacherService;