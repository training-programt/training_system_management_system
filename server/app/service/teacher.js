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
            .populate('teachRoom')
            .populate('course')
            .populate('major')
            .sort('sort');
        return result;
    }

    // 查询全部教师，分页
    async getAllTeacher(params) {
        const data = {
            pageSize: parseInt(params.rows),
            page: parseInt(params.page) - 1,
        }
        const result = await ctx.model.Teacher
            .find()
            .limit(data.pageSize)
            .skip(data.pageSize * data.page)
            .sort()
        return result;
    }

    async getTeacherByRoom(params) {
        const { ctx } = this
        const result = await ctx.model.Teacher.find({
            teachRoom: params.teachRoomId
        })
        return result
    }
    // 删除
    async delTeacher(params) {
        const { ctx } = this;
        const result = await ctx.model.Teacher.remove(params)
        return result
    }
    //修改
    async updataTeacher(params){
        const { ctx } = this;
        const result = await ctx.model.Teacher.findByIdAndUpdate(params)
        return result
    }
    //增加
    async addTeacher(params){
        const {ctx} = this;
        const result = await ctx.model.Teacher.insertMany(params);
        return result;
    }
     //条件查询
     async findTeacher(params) {
        const { ctx } = this;
        const result = await ctx.model.Teacher.find(params)
        return result;
    }
}
module.exports = TeacherService;