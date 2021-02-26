'use strict';
const Service = require('egg').Service;
class CourseService extends Service {

    // 查询全部课程
    async getCourse() {
        const { ctx } = this;
        const result = await ctx.model.Course
            .find({
            })
            .populate('header')
            .populate('syllabus')
            .populate('system')
            .populate('point')
            .populate('semester')
            .populate('unit')
            .populate('assessment')
            .populate('major')
            .sort('sort');
        return result;
    }
    // 删除
    async delCourse(params) {
        const { ctx } = this;
        const result = await ctx.model.Course.remove(params)
        return result
    }
    //修改
    async updataCourse(params){
        const { ctx } = this;
        const result = await ctx.model.Course.findByIdAndUpdate(params)
        return result
    }
    //增加
    async addCourse(params){
        const {ctx} = this;
        const result = await ctx.model.Course.insertMany(params);
        return result;
    }
}
module.exports = CourseService;