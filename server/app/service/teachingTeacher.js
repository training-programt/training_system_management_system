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
}
module.exports = TeachingTeacherService;