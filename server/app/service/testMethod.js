'use strict';
const Service = require('egg').Service;
class TestMethodService extends Service {
 //新建
 async addTestMethod(params) {
    const { ctx } = this;
    const result = await ctx.model.AttendanceProportion.create(params)
    return result;
}
//条件查询
async findTestMethod(params) {
    const { ctx } = this;
    const result = await ctx.model.AttendanceProportion.find(params)
    return result;
}
//删除
async delTestMethod(params) {
    const { ctx } = this;
    const result = await ctx.model.AttendanceProportion.remove(params)
    return result
}
//更新
async updateTestMethod(params) {
    const { ctx } = this;
    const result = await ctx.model.AttendanceProportion.findByIdAndUpdate(params)
    return result
}
}
module.exports = TestMethodService;
