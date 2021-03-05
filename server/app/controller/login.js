'use strict';

const { rs } = require('qiniu');

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async login() {
    const { ctx } = this;
    const userInfo = ctx.request.body;

    const data = {
      name: userInfo.account,
      password: userInfo.password
    }
    const res = await ctx.model.Teacher
      .findOne({ name: data.name }, { _id: 1, name: 1, role: 1, password: 1})
    if (!res) {
      ctx.body = {
        message: '用户不存在',
      }
    } else if (res.password != data.password) {
      ctx.body = {
        message: '用户密码错误',
      }
    } else {
      ctx.body = {
        total: 0,
        data: {
          userInfo: {
            _id: res._id,
            name: res.name,
            role: res.role
          },
          token: {
            token_type: 'bearer',
            access_token: '7cc9be26-4ef0-4a14-ae73-afde0639bc1e'
          }
        },
        code: 200,
        isSucceed: true,
      }
    }
  }

  async modifyPwd() {
    const { ctx } = this;
    const params = ctx.request.body
    console.log(params)
    const res = await ctx.model.Teacher.findOne({ _id: params._id })
    if (res.password != params.oldPassword) {
      ctx.body = {
        total: 0,
        message: '用户密码错误',
        code: 200,
        isSucceed: false,
      }
    } else {
      const res = await ctx.model.Teacher.findOneAndUpdate({ _id: params._id }, params, { projection: { _id: 1, name: 1, role: 1} })
      ctx.body = {
        total: 0,
        data: res,
        code: 200,
        isSucceed: true,
      }
    }
  }
}

module.exports = LoginController;