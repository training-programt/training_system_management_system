'use strict';
const Service = require('egg').Service;
class MongodbService extends Service {

  // 插入数据
  async create(params, table) {
    const { ctx } = this;
    const result = await ctx.mode[table].create(params);
    return result;
  }

}
module.exports = MongodbService;
