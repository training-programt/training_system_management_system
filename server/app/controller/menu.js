'use strict';
const Service = require('egg').Service;

class SettingService extends Service {

  async getMenu() {
    const { ctx } = this;
    // const res = await ctx.model.Menu.aggregate([
    //   {
    //     $lookup: {
    //       from: 'permission',
    //       localField: 'permission_id',
    //       foreignField: '_id',
    //       as: 'permission'
    //     },
    //   },
    // ])

    const res = await ctx.model.Menu
      .find({ level: '1' })
      .populate('permission')
      .populate('children')
      .sort('sort')
    ctx.body = {
      total: res.length,
      data: res,
      code: 200,
      isSucceed: true,
      newPrimaryKeys: {}
    }
  }

  async getAllMenu() {
    const { ctx } = this;
    const params = ctx.request.query;
    const data = {
      pageSize: parseInt(params.pageSize),
      page: parseInt(params.page) - 1,
    }
    const res = await ctx.model.Menu
      .find({ level: '1' })
      .populate('permission')
      .populate('children')
      .limit(data.pageSize)
      .skip(data.pageSize * data.page)
      .sort('sort')
    ctx.body = {
      total: res.length,
      data: res,
      code: 200,
      isSucceed: true,
      newPrimaryKeys: {}
    }
  }

  async delMenu() { }

  async addMenu() {
    const { ctx } = this;
    const params = ctx.request.body;
    const newMenu = await ctx.model.Menu.create(params);
    if (params.parent) {
      const res = await ctx.model.Menu.findByIdAndUpdate(
        { _id: params.parent },
        {
          $push: {
            children: newMenu._id
          }
        }
      );
      ctx.body = {
        total: 0,
        data: res,
        code: 200,
        isSucceed: true,
        newPrimaryKeys: {}
      }
    }

    ctx.body = {
      total: 0,
      data: newMenu,
      code: 200,
      isSucceed: true,
      newPrimaryKeys: {}
    }
  }
}

module.exports = SettingService;