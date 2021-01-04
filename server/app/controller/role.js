'use strict';
const Controller = require('egg').Controller;
class RoleController extends Controller {
  //得到账户信息
  async getRole() {
    const { ctx } = this;
    
    const res = await ctx.service.role.getRole()
    ctx.body = {
      total: res.length,
      data: res,
      code: 200,
      isSucceed: true,
      newPrimaryKeys: {}  
    };
  }
  async addRole() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.role.addRole(params)
    ctx.body = {
      total: res.length,
      data: res,
      code: 200,
      isSucceed: true,
    };
}
async delRole(){
  const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.role.delRole(params)
    ctx.body = {
      total: res.length,
      data: res,
      code: 200,
      isSucceed: true,
    };
}
}
module.exports = RoleController;