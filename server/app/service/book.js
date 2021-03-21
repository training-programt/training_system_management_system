'use strict';
const Service = require('egg').Service;
class BookService extends Service {
 //新建
 async addBook(params) {
    const { ctx } = this;
    const result = await ctx.model.Book.create(params)
    return result;
}
//条件查询
async findBook(params) {
    const { ctx } = this;
    const result = await ctx.model.Book.find(params)
    return result;
}
//删除
async delBook(params) {
    const { ctx } = this;
    const result = await ctx.model.Book.remove(params)
    return result
}
//更新
async updateBook(params) {
    const { ctx } = this;
    const result = await ctx.model.Book.findByIdAndUpdate(params)
    return result
}
}
module.exports = BookService;
