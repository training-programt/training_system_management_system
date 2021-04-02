'use strict';
const Service = require('egg').Service;
class CourseService extends Service {

    // 查询全部课程
    async getCourse(params) {
        const { ctx } = this;
        const regName = new RegExp(params.queryName, 'i')
        const regCode = new RegExp(params.queryCode, 'i')
        const result = await ctx.model.BasicCourse
            .find({
                $and: [{ name: { $regex: regName } }, { code: { $regex: regCode } }]
            })
            .limit(parseInt(params.pageSize))
            .skip(parseInt(params.pageSize) * (parseInt(params.page) - 1))
            .sort();
        return result;
    }
    async getCount() {
        const { ctx } = this;
        const count = await ctx.model.BasicCourse.find().count();
        return count;
    }

    // 删除
    async delCourse(params) {
        const { ctx } = this;
        const result = await ctx.model.BasicCourse.remove(params)
        return result
    }
    //条件查询
    async findCourse(params) {
        const { ctx } = this;
        const result = await ctx.model.BasicCourse.find(params)
        return result;
    }
    //修改
    async updateCourse(params) {
        const { ctx } = this;
        const result = await ctx.model.BasicCourse.findByIdAndUpdate(params._id, params)
        return result
    }
    //新建
    async addCourse(params) {
        const { ctx } = this;
        const result = await ctx.model.BasicCourse.create(params)
        return result;
    }
    //增加
    async addCourse(params) {
        const { ctx } = this;
        const result = await ctx.model.BasicCourse.insertMany(params);
        return result;
    }
    // 查询全部课程体系
    async getCourseSystem() {
        const { ctx } = this;
        const result = await ctx.model.CourseSystem
            .find({
            })
            .populate('creditStructure')
            .populate('syllcoursesabus')
            .sort('sort');
        return result;
    }

    async getAllCourse() {
        const { ctx } = this;
        const result = await ctx.model.BasicCourse.find({}, { _id: true, name: true }).sort();
        return result;
    }
}
module.exports = CourseService;