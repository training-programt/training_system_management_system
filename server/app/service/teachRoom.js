'use strict';
const Service = require('egg').Service;
class TeachRoomService extends Service {

    // 查询全部用户 老师
    async getTeachRoom() {
        const { ctx } = this;
        const result = await ctx.model.TeachRoom
            .find({
            })
            .populate('director')
            .populate('college')
            .populate('major')
            .populate('teachers')
            .sort('sort');
        return result;
    }
    
    // 删除
    async delTeachRoom(params) {
        const { ctx } = this;
        const result = await ctx.model.TeachRoom.remove(params)
        return result
    }
    //修改
    async updataTeachRoom(params){
        const { ctx } = this;
        const result = await ctx.model.TeachRoom.findByIdAndUpdate(params)
        return result
    }
    //增加
    async addTeachRoom(params){
        const {ctx} = this;
        const result = await ctx.model.TeachRoom.insertMany(params);
        return result;
    }
}
module.exports = TeachRoomService;