'use strict';
const Controller = require('egg').Controller;
 
class TrainingProjectController extends Controller {

  async getProjectList() {
    const { ctx } = this;
    const res = await ctx.service.trainingProject.getProjectList()
    if(res) {
      ctx.body = {
        total: 0,
        data: res,
        code: 200,
        isSucceed: true,
      }
    }
  }
  
  async createProject() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log(params)
    const res = await ctx.service.trainingProject.createProject(params)
    if(res) {
      ctx.body = {
        total: 0,
        data: res,
        code: 200,
        isSucceed: true,
      }
    }
  }
}
 
module.exports = TrainingProjectController;