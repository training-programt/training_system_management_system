'use strict';
const Controller = require('egg').Controller;
const path = require('path')
const fs = require('fs')

class DownloadController extends Controller {


  async createExcel() {
    const { ctx, app } = this;
    const officegen = require('officegen')
    let xlsx = officegen('xlsx')

    xlsx.on('finalize', function (written) {
      console.log(
        'Finish to create a Microsoft Excel document.'
      )
    })

    xlsx.on('error', function (err) {
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

    let fileName = 'example.xlsx'
    const filePath = path.resolve(app.config.static.dir, fileName);

    // let out = fs.createWriteStream(filePath)
    // out.on('error', function (err) {
    //   console.log(err)
    // })

    xlsx.generate(ctx.res)

    // await this.uploadFile()
    // await this.test();
  }

  async test() {
    const { ctx, app } = this;
    const fileName = 'example.xlsx'
    const filePath = path.resolve(app.config.static.dir, fileName);
    ctx.set('Content-Disposition', `attachment; filename=${fileName}`)
    ctx.set('Content-Type', 'application/octet-stream');

    ctx.body = fs.createReadStream(filePath);
  }

  async uploadFile() {
    const qiniu = require('qiniu');
    const { ctx, app, config } = this;
    const fileName = 'example.xlsx'
    const filePath = path.resolve(app.config.static.dir, fileName);

    const uploadToken = await ctx.service.qiniu.getToken(config.qiniuConfig.dataDucket);
    const configs = new qiniu.conf.Config();

    var formUploader = new qiniu.form_up.FormUploader(configs);
    var putExtra = new qiniu.form_up.PutExtra()
    var key = 'example.xlsx';
    formUploader.putFile(uploadToken, key, filePath, putExtra, function (respErr, respBody, respInfo) {
      if (respErr) { throw respErr; }
      if (respInfo.statusCode == 200) {
        console.log(respBody);
      } else {
        console.log(respInfo.statusCode);
        console.log(respBody);
      }
    });
  }

}

module.exports = DownloadController;