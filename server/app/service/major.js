'use strict';
const Service = require('egg').Service;
class MajorService extends Service {
    //新建
    async addMajor(params) {
        const { ctx } = this;
        const result = await ctx.model.Major.create(params)
        return result;
    }
    //条件查询
    async findMajor(params) {
        const { ctx } = this;
        const result = await ctx.model.Major.find(params)
        return result;
    }
    //删除
    async delMajor(params) {
        const { ctx } = this;
        const result = await ctx.model.Major.remove(params)
        return result
    }
    //更新
    async updataMajor(params) {
        const { ctx } = this;
        const result = await ctx.model.Major.findByIdAndUpdate(params)
        return result
    }

}
module.exports = MajorService;