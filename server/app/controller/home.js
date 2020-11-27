'use strict';

const Controller = require('egg').Controller;
const fs = require('mz/fs');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;

    // let res = await ctx.model.College.aggregate([
    //   {
    //     $lookup: {
    //       from: 'major',
    //       localField: 'id',
    //       foreignField: 'college',
    //       as: 'major'
    //     }
    //   },
    // ])

    let res = await ctx.model.Teacher.find()
    ctx.body = res;
  }

  async upload() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    const name = 'egg-multipart-test/' + path.basename(file.filename);
    let result;
    try {
      result = await ctx.oss.put(name, file.filepath);
    } finally {
      await fs.unlink(file.filepath);
    }
    ctx.body = {
      url: result.url,
      requestBody: ctx.request.body
    };
  }
}

module.exports = HomeController;
