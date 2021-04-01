'use strict';
const Service = require('egg').Service;
class TrainingProjectService extends Service {
  async getProjectList() {
    const { ctx } = this;
    const res = await ctx.model.TrainingProject
      .find()
      .populate('writer')
      .populate('major')
    return res
  }

  async getProjectDetail(params) {
    const { ctx } = this;
    const res = await ctx.model.TrainingProject.findOne(params)
    return res;
  }

  async createProject(params) {
    const { ctx } = this;
    const res = await ctx.model.TrainingProject.create(params)
    return res
  }

  async updateProject(params) {
    const { ctx } = this;
    const res = await ctx.model.TrainingProject.findByIdAndUpdate(params._id, params)
    return res
  }

  async delProject(params) {
    const { ctx } = this;
    const res = await ctx.model.TrainingProject.deleteOne(params)
    return res
  }

  async findObjAndReqByProject(params) {
    const { ctx } = this;
    const res = await ctx.model.TrainingProject
      .findOne(params, { trainingObjective: true, graduationRequirement: true })
      .populate('trainingObjective')
      .populate('graduationRequirement')
    return res
  }


}
module.exports = TrainingProjectService;