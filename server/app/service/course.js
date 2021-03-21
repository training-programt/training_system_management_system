'use strict';
const Service = require('egg').Service;
class CourseService extends Service {

    // 查询全部课程
    async getCourse() {
        const { ctx } = this;
        const result = await ctx.model.BasicCourse
            .find({
            })
            .populate('header')
            .populate('syllabus')
            .populate('system')
            .populate('point')
            .populate('semester')
            .populate('unit')
            .populate('assessment')
            .populate('professional')
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
      //条件查询
      async findCourse(params) {
        const { ctx } = this;
        const result = await ctx.model.Course.find(params)
        return result;
    }
    //修改
    async updataCourse(params){
        const { ctx } = this;
        const result = await ctx.model.Course.findByIdAndUpdate(params)
        return result
    }
      //新建
      async addCourse(params) {
        const { ctx } = this;
        const result = await ctx.model.Course.create(params)
        return result;
    }
    //增加
    async addCourse(params){
        const {ctx} = this;
        const result = await ctx.model.Course.insertMany(params);
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
        const result = await ctx.model.Course.find({}, {_id: true, name: true}).sort();
        return result;
    }
}
module.exports = CourseService;