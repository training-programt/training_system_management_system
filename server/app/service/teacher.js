'use strict';
const Service = require('egg').Service;
class TeacherService extends Service {
    async getTeacherDetail(params) {
        const { ctx } = this;
        const res = ctx.model.Teacher.findOne({ _id: params._id }).populate('teachRoom').populate('major')
        return res
    }
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
        const { ctx } = this;
        const data = {
            query: params.query || '',
            position: params.position || '',
            job: params.job || '',
            pageSize: parseInt(params.rows),
            page: parseInt(params.page) - 1,
        }
        const regName = new RegExp(data.query, 'i')
        const regPosition = new RegExp(data.position, 'i')
        const regJob = new RegExp(data.job, 'i')
        console.log(data)

        const result = await ctx.model.Teacher
            .find({
                $or: [
                    { name: { $regex: regName } },
                    { position: { $regex: regPosition } },
                    { job: data.job }
                ]
            })
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
    async updataTeacher(params) {
        const { ctx } = this;
        const result = await ctx.model.Teacher.findByIdAndUpdate(params)
        return result
    }
    //增加
    async addTeacher(params) {
        const { ctx } = this;
        const result = await ctx.model.Teacher.insertMany(params);
        return result;
    }
    //条件查询
    async findTeacher(params) {
        const { ctx } = this;
        const result = await ctx.model.Teacher.find(params)
        // .populate('role')
        // .populate('teachRoom')
        // .populate('course')
        // .populate('major')
        // .populate('header')
        // .sort('sort');
        return result;
    }

    async getLeaderList() {
        const { ctx } = this;
        const res = await ctx.model.Role.findOne({roleName: '教学领导'});
        if(res) {
            const result = await ctx.model.Teacher.find({role: res._id}, { name: true, _id: true})
            return result
        }
    }
}
module.exports = TeacherService;