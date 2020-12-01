'use strict';
const Service = require('egg').Service;
class MongodbService extends Service {

  // 插入数据
  async create(params, table) {
    const { ctx } = this;
    const result = await ctx.model[table].create(params);
    return result;
  }

  // 查询全部
  async find(table) {
    const { ctx } = this;
    const result = await ctx.model[table].find();
    return result;
  }

  // 通过id查询
  async findById(params, table) {
    const { ctx } = this;
    const result = await ctx.model[table].findById(params);
    return result;
  }

  // 更新
  async findAndUpdate(params, table) {
    const { ctx } = this;
    const result = await ctx.model[table].findByIdAndUpdate(params);
    return result;
  }

  // 删除
  async findAndDelete(params, table) {
    const { ctx } = this;
    const result = await ctx.model[table].findByIdAndDelete(params);
    return result;
  }
}
module.exports = MongodbService;
