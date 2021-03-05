'use strict';
const Service = require('egg').Service;
class TrainingProjectService extends Service {
  async getProjectList() {
    const { ctx } = this;
    const res = await ctx.model.TrainingProject.find()
    return res
  }

  async createProject(params) {
    const { ctx } = this;
    const res = await ctx.model.TrainingProject.create(params)
    return res
  }
}
module.exports = TrainingProjectService;