'use strict';
const Controller = require('egg').Controller;

class MajorController extends Controller {
    async queryMajor() {
        const { ctx } = this;
        const params = ctx.request.body;
        const reg = new RegExp(params.name, 'i')
        const res = await ctx.model.Major.find(
            {
                $or: [
                    { name: { $regex: reg } },
                    { code: { $regex: reg } }
                ]
            }
        );
        ctx.body = {
            total: res.length,
            data: res,
            code: 200,
            isSucceed: true,
            message:'查询成功',
        };
    }
    async getMajor() {
        const { ctx } = this;
        const res = await ctx.model.Major.find({});
        ctx.body = {
            total: res.length,
            data: res,
            code: 200,
            isSucceed: true,
        };
    }
    async addMajor() {
        const { ctx } = this;
        const params = ctx.request.body;
        console.log(params)
        const findMajor = await ctx.service.major.findMajor(
            {$or: [{name: params.name}, {code: params.code}]}
            )
        // console.log(findMajor)
        if(findMajor.length!=0){
            ctx.body = {
                message:'新增失败,已经存在相同专业或编码',
                code: 200,
                isSucceed: false,
            }; 
        }else{
            const res = await ctx.service.major.addMajor(params)
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
    async delMajor() {
        const { ctx } = this;
        const params = ctx.request.body;
        const res = await ctx.service.major.delMajor({_id:params._id})
        // console.log(res)
        if (res.ok==1) {
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
    async updateMajor() {
        const { ctx } = this;
        const params = ctx.request.body;
        const res = await ctx.model.Major.update(
            {_id:params._id},
            {
                $set: {
                  _id: params._id,
                  name: params.name,
                  code: params.code,
                  introduce: params.introduce,
                  count: params.count,
                }
            }
            )
        console.log(res)
        if (res.ok==1) {
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

module.exports = MajorController;