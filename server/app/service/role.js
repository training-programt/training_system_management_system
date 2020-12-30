'use strict';
const Service = require('egg').Service;
class RoleService extends Service {
    //得到所有的账户信息
    async getRole() {
        const { ctx } = this;
        const result = await ctx.model.Role
            .find()
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
}
module.exports = RoleService;