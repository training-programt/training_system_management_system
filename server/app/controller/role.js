'use strict';
const Service = require('egg').Service;
class RoleService extends Service {
  async getRole() {
    const { ctx } = this;
    
    const res = await ctx.model.Role.find().populate('permission')

    ctx.body = {
      total: res.length,
      data: res,
      code: 200,
      isSucceed: true,
      newPrimaryKeys: {}  
    };
  }
}
module.exports = RoleService;