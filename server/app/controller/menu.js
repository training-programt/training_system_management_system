'use strict';
const Controller = require('egg').Controller;

class MenuController extends Controller {

  async getMenu() {
    const { ctx } = this;
    const res = await ctx.service.menu.getMenu()
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

  async delMenu() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.menu.delMenu(params);
    console.log(res)
    ctx.body = {
      total: 0,
      data: res,
      code: 200,
      message: '删除成功',
      isSucceed: true,
    }
  }

  async addMenu() {
    const { ctx } = this;
    const params = ctx.request.body;
    const newMenu = await ctx.service.menu.addMenu(params);
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
        message: '新增子菜单成功',
        isSucceed: true,
      }
    } else {
      ctx.body = {
        total: 0,
        data: newMenu,
        code: 200,
        message: '新增菜单成功',
        isSucceed: true,
      }
    }


  }
  async updataMenu() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.menu.updataMenu(
      { _id: params._id },
      {
        $set: {
          sort: params.sort,
          name: params.name,
          key: params.key,
          icon: params.icon,
          level: params.level,
          role: params.role,
          children: params.children
        }
      }
    );
    ctx.body = {
      total: 0,
      data: res,
      code: 200,
      message: '修改成功',
      isSucceed: true,
    }
  }
}

module.exports = MenuController;