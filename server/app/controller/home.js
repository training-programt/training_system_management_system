/*
 * @Description: 
 * @version: 1.0.0
 * @Author: wutao
 * @Date: 2021-04-01 22:27:20
 * @LastEditTime: 2021-05-16 11:12:29
 */
'use strict';
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;

    const res = await ctx.model.Teacher
      .find()
      .populate('role')
      .populate('position_id')
      .populate('education_id')
      .populate('post_id')
      .populate('teachRoom_id')

    ctx.body = res
  }

  async upload() {
    const { ctx, config } = this;
    const uploadToken = await ctx.service.qiniu.getToken(config.qiniuConfig.dataDucket);
    const data = await ctx.service.qiniu.uploadFiles(uploadToken);
    if (data) {
      ctx.body = {
        "message": '上传成功',
        "isSucceed": true,
      }
    } else {
      ctx.body = {
        "message": "上传失败",
        "isSucceed": false,
      }
    }
  }
  // 得到某表所有数据 测试
  async getList(){
    const ctx = this.ctx;
    var aa = await ctx.service.test.find({});
    ctx.body = aa
  }



  async download() {
    const { ctx } =  this;
    const officegen = require('officegen');
    const fs = require('fs')

    let xlsx = officegen('xlsx')
    xlsx.on('finalize', function(written) {
      console.log(
        'Finish to create a Microsoft Excel document.'
      )
    })
    xlsx.on('error', function(err) {
      console.log(err)
    })
    let sheet = xlsx.makeNewSheet()
    sheet.name = 'Officegen Excel'
    sheet.setCell('E7', 42)
    sheet.setCell('I1', -3)
    sheet.setCell('I2', 3.141592653589)
    sheet.setCell('G102', 'Hello World!')
    sheet.data[0] = []
    sheet.data[0][0] = 1
    sheet.data[1] = []
    sheet.data[1][3] = 'some'
    sheet.data[1][4] = 'data'
    sheet.data[1][5] = 'goes'
    sheet.data[1][6] = 'here'
    sheet.data[2] = []
    sheet.data[2][5] = 'more text'
    sheet.data[2][6] = 900
    sheet.data[6] = []
    sheet.data[6][2] = 1972

    let out = fs.createWriteStream('test.xlsx')

    out.on('error', function (err) {
      console.log(err)
    })

    xlsx.generate(out)

    ctx.body = {
      code: 200,
      isSucceed: true,
      data: out
    }
  }
}

module.exports = HomeController;
