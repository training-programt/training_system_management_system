'use strict';
const Service = require('egg').Service;
class RoleService extends Service {
    //得到所有的账户信息
    async getRole(params) {
        const { ctx } = this;
        const name = new RegExp(params.name, 'i')
        const result = await ctx.model.Role
            .find({
                roleName: { $regex: name }
            })
            .populate('menu')
            .populate('children')
            .sort()
        return result
    }
     //新建
     async addRole(params){
        const {ctx} = this;
        const result  = await ctx.model.Role.create(params)
        return result;
    }
    //删除
    async delRole(params){
        const {ctx} = this;
        const result = await ctx.model.Role.remove(params)
        return result
    }
     //条件查询
     async findRole(params) {
        const { ctx } = this;
        const result = await ctx.model.Role.find(params)
        return result;
    }
    //更新
    async updataRole(params) {
        const { ctx } = this;
        const result = await ctx.model.Role.findByIdAndUpdate(params)
        return result
    }
}
module.exports = RoleService;