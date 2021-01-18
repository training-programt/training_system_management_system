'use strict';
const Service = require('egg').Service;
class TestService extends Service {

  // 查询全部
  async find() {
    const { ctx } = this;
    const result = await ctx.model.Menu.find({});
    return result;
  }
}
module.exports = TestService;
