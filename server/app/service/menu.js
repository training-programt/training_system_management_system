'use strict';
const Service = require('egg').Service;
class MenuService extends Service {

    // 查询全部菜单
    async getMenu() {
        const { ctx } = this;
        const data = ctx.request.query
        const result = await ctx.model.Menu
            .find({
                role:data.role,
                level:1
            })
            .populate('menu')
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
            // .populate('permission')
            .populate('role')
            .populate('children')
            .limit(data.pageSize)
            .skip(data.pageSize * data.page)
            .sort('sort')
        return result;
    }
    async addMenu() {
        const { ctx } = this;
        
        // return 
    }
}
module.exports = MenuService;