'use strict';
const Controller = require('egg').Controller;
const officegen = require('officegen')
const fs = require('fs')
const path = require('path')

class NationalRequirementController extends Controller {
  async getRequirement() {
    const { ctx } = this;
    const params = ctx.request.query;
    const res = await ctx.service.nationalRequirement.getRequirement(params)
    ctx.body = {
      total: res.length,
      data: res,
      code: 200,
      isSucceed: true,
    }
  }

  async addRequirement() {
    const { ctx } = this;
    const params = ctx.request.body;

    const res = await ctx.service.nationalRequirement.addRequirement(params)
    if (res) {
      ctx.body = {
        total: 0,
        data: res,
        code: 200,
        message: '新增成功',
        isSucceed: true,
      }
    }
    else {
      ctx.body = {
        total: 0,
        data: res,
        code: 200,
        message: '新增失败',
        isSucceed: false,
      }
    }
  }

  async delRequirement() {
    const { ctx } = this;

    const params = ctx.request.body;
    const res = await ctx.service.nationalRequirement.delRequirement(params)
    console.log(res)
    if (res) {
      ctx.body = {
        total: 0,
        data: res,
        code: 200,
        message: '删除成功',
        isSucceed: true,
      }
    } else {
      ctx.body = {
        total: 0,
        data: res,
        code: 200,
        message: '删除失败',
        isSucceed: false,
      }
    }
  }

  async updateRequirement() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.nationalRequirement.updateRequirement(params)
    if (res) {
      ctx.body = {
        total: 0,
        data: res,
        code: 200,
        message: '修改成功',
        isSucceed: true,
      }
    }
    else {
      ctx.body = {
        total: 0,
        data: res,
        code: 200,
        message: '修改失败',
        isSucceed: false,
      }
    }

  }

  async downloadRequirement() {
    const { ctx, app } = this;

    // Create an empty Word object:
    let docx = officegen('docx')

    // Officegen calling this function after finishing to generate the docx document:
    docx.on('finalize', function (written) {
      console.log(
        'Finish to create a Microsoft Word document.'
      )
    })
    docx.on('error', function (err) {
      console.log(err)
    })

    let pObj = docx.createP()

    pObj.addText('Simple')
    pObj.addText(' with color', { color: '000088' })
    pObj.addText(' and back color.', { color: '00ffff', back: '000088' })

    pObj = docx.createP()

    pObj.addText('Since ')
    pObj.addText('officegen 0.2.12', {
      back: '00ffff',
      shdType: 'pct12',
      shdColor: 'ff0000'
    }) // Use pattern in the background.
    pObj.addText(' you can do ')
    pObj.addText('more cool ', { highlight: true }) // Highlight!
    pObj.addText('stuff!', { highlight: 'darkGreen' }) // Different highlight color.

    pObj = docx.createP()

    pObj.addText('Even add ')
    pObj.addText('external link', { link: 'https://github.com' })
    pObj.addText('!')

    pObj = docx.createP()

    pObj.addText('Bold + underline', { bold: true, underline: true })

    pObj = docx.createP({ align: 'center' })

    pObj.addText('Center this text', {
      border: 'dotted',
      borderSize: 12,
      borderColor: '88CCFF'
    })

    pObj = docx.createP()
    pObj.options.align = 'right'

    pObj.addText('Align this text to the right.')

    pObj = docx.createP()

    pObj.addText('Those two lines are in the same paragraph,')
    pObj.addLineBreak()
    pObj.addText('but they are separated by a line break.')

    docx.putPageBreak()

    pObj = docx.createP()

    pObj.addText('Fonts face only.', { font_face: 'Arial' })
    pObj.addText(' Fonts face and size.', { font_face: 'Arial', font_size: 40 })

    docx.putPageBreak()

    pObj = docx.createP()

    let out = fs.createWriteStream('example.docx')

    out.on('error', function (err) {
      console.log(err)
    })

    docx.generate(ctx.res)
  }
}

module.exports = NationalRequirementController;