'use strict';
const Service = require('egg').Service;
class CourseLeaderService extends Service {

    // 查询全部教学大纲
    async getSyllabus() {
        const { ctx } = this;
        const result = await ctx.model.Syllabus
            .find({
            })
            .populate('course_info')
            // .populate('teaching_goal')
            // .populate('theory_teaching')
            // .populate('practice_teaching')
            // .populate('assessment')
            .populate('reviewer')
            .sort('sort');
        return result;
    }
    // 删除课程大纲
    async delSyllabus(params) {
        const { ctx } = this;
        const result = await ctx.model.Syllabus.remove(params)
        return result
    }
    //修改课程大纲
    async updataSyllabus(params){
        const { ctx } = this;
        const result = await ctx.model.Syllabus.findByIdAndUpdate(params)
        return result
    }
    //增加课程大纲
    async addSyllabus(params){
        const {ctx} = this;
        const result = await ctx.model.Syllabus.insertMany(params);
        return result;
    }
}
module.exports = CourseLeaderService;