'use strict';
const Service = require('egg').Service;
class GradeService extends Service {
    //新建
    async addGrade(params) {
        const { ctx } = this;
        const result = await ctx.model.Grade.create(params)
        return result;
    }
    // 查询全部年级
    async getGrade() {
        const { ctx } = this;
        const result = await ctx.model.Grade
            .find({
            })
            .populate('studentNumber')
            .sort('sort');
        return result;
    }
    // 查询全部学期
    async getSemester() {
        const { ctx } = this;
        const result = await ctx.model.Semester
            .find({
            })
            .sort('sort');
        return result;
    }
    //条件查询
    async findGrade(params) {
        const { ctx } = this;
        const result = await ctx.model.Grade.find(params)
        return result;
    }
    //删除
    async delGrade(params) {
        const { ctx } = this;
        const result = await ctx.model.Grade.remove(params)
        return result
    }
    //更新
    async updataGrade(params) {
        const { ctx } = this;
        const result = await ctx.model.Grade.findByIdAndUpdate(params)
        return result
    }

}
module.exports = GradeService;