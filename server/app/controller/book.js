'use strict';
const Controller = require('egg').Controller;

class BookController extends Controller {
    //参考书
    async getBook() {
        const { ctx } = this;
        const res = await ctx.model.Book.find({}).sort()
        ctx.body = {
            total: res.length,
            data: res,
            code: 200,
            isSucceed: true,
        };
    }
    async addBook() {
        const { ctx } = this;
        const params = ctx.request.body;
        const find = await ctx.service.book.findBook(
            {name: params.name}
            )
        if(find.length!=0){
            ctx.body = {
                message:'新增失败,已经存在相同内容',
                code: 200,
                isSucceed: false,
            }; 
        }else{
            const res = await ctx.service.book.addBook(params)
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
    async delBook() {
        const { ctx } = this;
        const params = ctx.request.body;
        const res = await ctx.service.book.delBook({_id:params._id})
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

}

module.exports = BookController;