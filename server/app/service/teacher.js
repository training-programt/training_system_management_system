'use strict';
const Service = require('egg').Service;
class TeacherService extends Service {

    // 查询全部菜单
    async getTeacher() {
        const { ctx } = this;
        const result = await ctx.model.Teacher
            .find({
            })
            .populate('role')
            .sort('sort');
        return result;
    }
}
module.exports = TeacherService;