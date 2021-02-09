'use strict';
const Service = require('egg').Service;
class MenuService extends Service {

    // 查询全部菜单
    async getMenu() {
        const { ctx } = this;
        const data = ctx.request.query
        console.log(data.role)
        const result = await ctx.model.Menu.find({
            role: {$in: data.role.split(",")},
            level: 1
        })
            // .populate('menu')
            .populate('role')
            .populate('children')
            .populate('role')
            .populate('children')
            .sort('sort');
        return result;
    }
    async getAllMenu() {
        const { ctx } = this;
        const params = ctx.request.query;
        const data = {
            pageSize: parseInt(params.pageSize),
            page: parseInt(params.page) - 1,
        }
        const result = await ctx.model.Menu
            .find({ level: '1' })
            .populate('role')
            .populate('children')
            .limit(data.pageSize)
            .skip(data.pageSize * data.page)
            .sort('sort')
        return result;
    }
    
    //新建
    async addMenu(params) {
        const { ctx } = this;
        const result = await ctx.model.Menu.create(params)
        return result;
    }
    //条件查询
    async findMenu(params) {
        const { ctx } = this;
        const result = await ctx.model.Menu.find(params)
        return result;
    }
    //删除
    async delMenu(params) {
        const { ctx } = this;
        const result = await ctx.model.Menu.remove(params)
        return result
    }
    //更新
    async updataMenu(params) {
        const { ctx } = this;
        const result = await ctx.model.Menu.findByIdAndUpdate(params)
        return result
    }
}
module.exports = MenuService;