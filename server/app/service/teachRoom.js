'use strict';
const Service = require('egg').Service;
class TeachRoomService extends Service {

    // 查询学院下的教研室
    async getTeachRoom(params) {
        const { ctx } = this;
        const reg = new RegExp(params.query, 'i')
        const result = await ctx.model.TeachRoom
            .find({
                // $and: [
                //     { $or: [{ name: { $regex: reg } }] },
                //     { $or: [{ type: parseInt(params.type) }] }
                // ]
                $or: [{ name: { $regex: reg } }, { type: params.type }]
            })
            .populate('director')
            .populate('college')
            .populate('major')
            .populate('teachers')
            .limit(parseInt(params.pageSize))
            .skip(parseInt(params.pageSize) * parseInt(params.page))
            .sort('sort')
        return result;
    }
    // 查询教研室详情
    async getRoomDetail(params) {
        const { ctx } = this;
        const result = await ctx.model.TeachRoom.findOne({_id: params._id}).populate('teachers')
        return result
    }

    // 删除
    async delTeachRoom(params) {
        const { ctx } = this;
        const result = await ctx.model.TeachRoom.remove(params)
        return result
    }
    //修改
    async updateTeachRoom(params) {
        const { ctx } = this;
        const result = await ctx.model.TeachRoom.findByIdAndUpdate(params._id, params)
        return result
    }
    //增加
    async addTeachRoom(params) {
        const { ctx } = this;
        const result = await ctx.model.TeachRoom.create(params);
        return result;
    }
}
module.exports = TeachRoomService;