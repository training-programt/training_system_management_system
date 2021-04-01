'use strict';
const Service = require('egg').Service;
class TrainingObjectiveService extends Service {
  async createObject(params) {
    const { ctx } = this;
    const res = await ctx.model.TrainingObjective.create(params)
    return res;
  }

  async updateObject(params) {
    const { ctx } = this;
    const res = await ctx.model.TrainingObjective.findOneAndUpdate({ _id: params.objectId }, params)
    return res;
  }

  async getObjectData(params) {
    const { ctx } = this;
    const res = await ctx.model.TrainingObjective.findOne(params)
    return res;
  }

  async delObject(params) {
    const { ctx } = this;
    const res = await ctx.model.TrainingObjective.deleteOne(params)
    return res;
  }
}
module.exports = TrainingObjectiveService;