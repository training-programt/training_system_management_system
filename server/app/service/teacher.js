'use strict';
const Service = require('egg').Service;
class TeacherService extends Service {

    // 查询全部用户 老师
    async getTeacher() {
        const { ctx } = this;
        const result = await ctx.model.Teacher
            .find({
            })
            .populate('role')
            .sort('sort');
        return result;
    }
    // 删除
    async delTeacher(params) {
        const { ctx } = this;
        const result = await ctx.model.Teacher.remove(params)
        return result
    }
}
module.exports = TeacherService;