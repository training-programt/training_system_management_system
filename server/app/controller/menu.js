'use strict';

const { consoleLevel } = require('egg-mock');

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
  async getMenuByRole() {
    const { ctx } = this;
    const params = ctx.request.body;
    const result = await ctx.service.role.findRole({ _id: params._id });
    const res = await ctx.model.Menu.find({ _id: { $in: result[0].menu }, level: 1 })
      .populate('role')
      .populate('children')
      .sort('sort');

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
    const res = await ctx.service.menu.delMenu({ _id: params._id });
    if (res.ok == 1) {
      const delRole = await ctx.model.Role.update(
        { _id: params.role },
        {
          $pull: {
            menu: params._id
          }
        }
      )
      if (params.parent) {
        // const menuInfo = await ctx.service.menu.findMenu({_id:params.parent})
        // const index = menuInfo[0].children.findIndex(item =>item == params._id)
        // const newArr = [].concat([...menuInfo[0].children.slice(0,index),...menuInfo[0].children.slice(index+1)])
        const meunDelete = await ctx.model.Menu.update(
          { _id: params.parent },
          {
            $pull: {
              children: params._id
            }
          }
        )
      }
    }
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
    const roleAdd = await ctx.model.Role.findByIdAndUpdate(
      { _id: params.role },
      {
        $push: {
          menu: newMenu._id
        }
      }
    )
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
    const findMenu = await ctx.service.menu.findMenu({ _id: params._id })
    console.log(findMenu)
    if (params.parent !== findMenu[0].parent) {
      const meunDelete = await ctx.model.Menu.update(
        { _id: findMenu[0].parent },
        {
          $pull: {
            children: params._id
          }
        }
      )
      const addMenu = await ctx.model.Menu.update(
        { _id: params.parent },
        {
          $push: {
            children: params._id
          }
        }
      )
    }
    if (params.role !== findMenu[0].role) {
      const roleDelete = await ctx.model.Role.update(
        { _id: findMenu[0].role },
        {
          $pull: {
            children: params._id
          }
        }
      )
      const roleAdd = await ctx.model.Role.update(
        { _id: params.role },
        {
          $push: {
            children: params._id
          }
        }
      )
    }
    const res = await ctx.model.Menu.update(
      { _id: params._id },
      {
        $set: {
          sort: params.sort,
          name: params.name,
          key: params.key,
          icon: params.icon,
          level: params.level,
          role: params.role,
          parent: params.parent
        }
      }
    );
    console.log(res)
    if (res.ok == 1) {
      ctx.body = {
        total: 0,
        data: res,
        code: 200,
        message: '修改成功',
        isSucceed: true,
      }
    } else {
      ctx.body = {
        code: 500,
        message: '修改失败',
        isSucceed: false,
      }
    }

  }
}

module.exports = MenuController;