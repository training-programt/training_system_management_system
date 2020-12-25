'use strict';
const Service = require('egg').Service;

class SettingService extends Service {

  async getMenu() {
    const { ctx } = this;
    const res = await ctx.service.menu.getMenu()
    // console.log(res)
    ctx.body = {
      total: res.length,
      data: res,
      code: 200,
      isSucceed: true,
    }
  }

  async getAllMenu() {
    const { ctx } = this;
    const res = await ctx.service.menu.getAllMenu()
    ctx.body = {
      total: res.length,
      data: res,
      code: 200,
      isSucceed: true,
    }
  }

  async delMenu() { }

  async addMenu() {
    const { ctx } = this;
    const params = ctx.request.body;
        console.log(params)
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
                message: '新增成功',
                isSucceed: true,
            }
        }

        ctx.body = {
            total: 0,
            data: newMenu,
            code: 200,
            message: '新增成功',
            isSucceed: true,
        }
  }
}

module.exports = SettingService;