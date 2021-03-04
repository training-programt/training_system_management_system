"use strict";
const Controller = require("egg").Controller;
const fs = require('fs')
const officegen = require('officegen')

class TeachRoomController extends Controller {
  async getTeachRoom() {
    const { ctx } = this;
    const params = ctx.request.query;
    const data = await ctx.service.teachRoom.getTeachRoom(params);

    ctx.body = {
      total: data.length,
      data: data,
      code: 200,
      isSucceed: true,
    };
  }

  async getRoomDetail() {
    const { ctx } = this;
    const params = ctx.request.query;
    const data = await ctx.service.teachRoom.getRoomDetail(params);
    ctx.body = {
      total: data.length,
      data: data,
      code: 200,
      isSucceed: true,
    };
  }

  async addTeachRoom() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.teachRoom.addTeachRoom(params);
    if (res) {
      ctx.body = {
        total: 0,
        data: res,
        message: '新增成功',
        code: 200,
        isSucceed: true,
      };
    } else {
      ctx.body = {
        total: 0,
        message: '新增失败',
        code: 200,
        isSucceed: false,
      };
    }
  }

  async updateTeachRoom() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.teachRoom.updateTeachRoom(params);
    if (res) {
      ctx.body = {
        total: 0,
        data: res,
        message: '修改成功',
        code: 200,
        isSucceed: true,
      };
    } else {
      ctx.body = {
        total: 0,
        message: '修改失败',
        code: 200,
        isSucceed: false,
      };
    }
  }

  async delTeachRoom() {
    const { ctx } = this;

    const params = ctx.request.body;

    const res = await ctx.service.teachRoom.delTeachRoom({ _id: params._id })

    if (res) {
      ctx.body = {
        total: 0,
        data: res,
        message: '删除成功',
        code: 200,
        isSucceed: true,
      };
    } else {
      ctx.body = {
        total: 0,
        message: '删除失败',
        code: 200,
        isSucceed: false,
      };
    }
  }

  async exportOneRoom() {
    const { ctx } = this;
    const xlsx = officegen('xlsx')     // 创建Excel实例
    const sheet = xlsx.makeNewSheet()
    const params = ctx.request.body;
    const data = await ctx.service.teachRoom.getRoomDetail(params);
    console.log(data)
    sheet.name = data.name
    let excelData = [];
    excelData.push(['序号', '姓名', '性别', '专职/兼职', '职位', '最后学位']) 
    data.teachers.forEach((item, index) => {
      let temp = [];
      temp[0] = index + 1;
      temp[1] = item.name;
      temp[2] = item.sex;
      temp[3] = item.job;
      temp[4] = item.position;
      temp[5] = item.lastInfo;
      excelData.push(temp)
    });
    console.log(excelData)
    sheet.data = excelData
    xlsx.generate('test.xlsx')
    ctx.body = {
      total: 0,
      data: fs.createReadStream('test.xlsx'),
      code: 200,
      isSucceed: true,
    }
  }
}

module.exports = TeachRoomController;
