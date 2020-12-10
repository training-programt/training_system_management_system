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

    const res = await ctx.model.Teacher.findOne({ name: data.name })
    console.log(res)
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
          userInfo: res,
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
}

module.exports = LoginController;