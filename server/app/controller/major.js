'use strict';
const Controller = require('egg').Controller;

class MajorController extends Controller {
    async getMajor(){
        const {ctx} = this;
        const res = await ctx.model.Major.find({});
        console.log(res)
        ctx.body = {
            total: res.length,
            data: res,
            code: 200,
            isSucceed: true,
          };
    }
 
}

module.exports = MajorController;