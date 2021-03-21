'use strict';
const Controller = require('egg').Controller;

class TestMethodController extends Controller {
    //考核环节
    async getTestMethod() {
        const { ctx } = this;
        const res = await ctx.model.AttendanceProportion.find({}).sort()
        ctx.body = {
            total: res.length,
            data: res,
            code: 200,
            isSucceed: true,
        };
    }
    async addTestMethod() {
        const { ctx } = this;
        const params = ctx.request.body;
        const find = await ctx.service.testMethod.findTestMethod(
            {name: params.name}
            )
        if(find.length!=0){
            ctx.body = {
                message:'新增失败,已经存在相同名字的考核环节',
                code: 200,
                isSucceed: false,
            }; 
        }else{
            const res = await ctx.service.testMethod.addTestMethod(params)
            if (res) {
                ctx.body = {
                    total: res.length,
                    data: res,
                    code: 200,
                    isSucceed: true,
                    message:'新增成功',
                };
            }else{
                ctx.body = {
                    message:'新增失败',
                    code: 200,
                    isSucceed: false,
                };  
            }
        }
       
    }
    async delTestMethod() {
        const { ctx } = this;
        const params = ctx.request.body;
        const res = await ctx.service.testMethod.delTestMethod({_id:params._id})
        if (res.n==1) {
            ctx.body = {
                total: res.length,
                data: res,
                code: 200,
                isSucceed: true,
                message:'删除成功',
            };
        }else{
            ctx.body = {
                message:'删除失败',
                code: 200,
                isSucceed: false,
            };  
        }
    }
    async updateTestMethod() {
        const { ctx } = this;
        const params = ctx.request.body;
        const res = await ctx.model.AttendanceProportion.update(
            {_id:params._id},
            {
                $set: {
                  _id: params._id,
                  name: params.name,
                  content: params.content,
                  account: params.account,
                }
            }
            )
        console.log(res)
        if (res.n==1) {
            ctx.body = {
                total: res.length,
                message:'修改成功',
                data: res,
                code: 200,
                isSucceed: true,
            };
        }else{
            ctx.body = {
                message:'修改失败',
                code: 200,
                isSucceed: false,
            };  
        }
    }

}

module.exports = TestMethodController;