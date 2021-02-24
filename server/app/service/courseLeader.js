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


     // 查询全部课程教学目标
     async getTeachGoal() {
        const { ctx } = this;
        const result = await ctx.model.TeachingGoal
            .find({
            })
            .populate('attendance_proportion')
            .sort('sort');
        return result;
    }
    //添加教学目标
    async addTeachGoal(params) {
        const { ctx } = this;
        const result = await ctx.model.TeachingGoal.create(params)
        return result;
    }
    //删除教学目标
    async delTeachGoal(params) {
        const { ctx } = this;
        const result = await ctx.model.TeachingGoal.remove(params)
        return result
    }
     //更新
     async updataTeachGoal(params) {
        const { ctx } = this;
        const result = await ctx.model.TeachingGoal.findByIdAndUpdate(params)
        return result
    }
     //条件查询
     async findTeachGoal(params) {
        const { ctx } = this;
        const result = await ctx.model.TeachingGoal.find(params)
        return result;
    }
}
module.exports = CourseLeaderService;