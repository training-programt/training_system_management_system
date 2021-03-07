'use strict';
const Controller = require('egg').Controller;

class GradeController extends Controller {
  async getGrade() {
    const { ctx } = this;
    const data = await ctx.service.grade.getGrade()
    ctx.body = {
      total: data.length,
      data: data,
      code: 200,
      isSucceed: true,
    }

  }
  async addGrade() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log(params)
    const findGrade = await ctx.service.grade.findGrade(
      { name: params.name }
    )
    // console.log(findMajor)
    if (findGrade.length != 0) {
      ctx.body = {
        message: '新增失败,已经存在相同年级名字',
        code: 200,
        isSucceed: false,
      };
    } else {
      const res = await ctx.service.grade.addGrade(params)
      if (res) {
        ctx.body = {
          total: res.length,
          data: res,
          code: 200,
          isSucceed: true,
          message: '新增成功',
        };
      } else {
        ctx.body = {
          message: '新增失败',
          code: 200,
          isSucceed: false,
        };
      }
    }
  }
  async delGrade() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.grade.delGrade({ _id: params._id })
    if (res.ok == 1) {
      ctx.body = {
        total: res.length,
        data: res,
        code: 200,
        isSucceed: true,
        message: '删除成功',
      };
    } else {
      ctx.body = {
        message: '删除失败',
        code: 200,
        isSucceed: false,
      };
    }
  }
  async updateGrade() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.model.Grade.update(
      { _id: params._id },
      {
        $set: {
          _id: params._id,
          studentNumber: params.studentNumber,
        }
      }
    )
    if (res.ok == 1) {
      ctx.body = {
        total: res.length,
        message: '修改成功',
        data: res,
        code: 200,
        isSucceed: true,
      };
    } else {
      ctx.body = {
        message: '修改失败',
        code: 200,
        isSucceed: false,
      };
    }
  }
  async getSemester() {
    const { ctx } = this;
    const data = await ctx.service.grade.getSemester()
    ctx.body = {
      total: data.length,
      data: data,
      code: 200,
      isSucceed: true,
    }

  }
  async addSemester() {
    const { ctx } = this;
    const params = ctx.request.body;
    const findSemester = await ctx.service.grade.findSemester(
      { semesterName: params.semesterName }
    )
    if (findSemester.length != 0) {
      ctx.body = {
        message: '新增失败,已经存在相同学期名字',
        code: 200,
        isSucceed: false,
      };
    } else {
      const res = await ctx.service.grade.addSemester(params)
      if (res) {
        ctx.body = {
          total: res.length,
          data: res,
          code: 200,
          isSucceed: true,
          message: '新增成功',
        };
      } else {
        ctx.body = {
          message: '新增失败',
          code: 200,
          isSucceed: false,
        };
      }
    }
  }
  async delSemester() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.grade.delSemester({ _id: params._id })
    console.log(res)
    if (res.ok == 1) {
      ctx.body = {
        total: res.length,
        data: res,
        code: 200,
        isSucceed: true,
        message: '删除成功',
      };
    } else {
      ctx.body = {
        message: '删除失败',
        code: 200,
        isSucceed: false,
      };
    }
  }
  async updateSemester() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.model.Semester.update(
      { _id: params._id },
      {
        $set: {
          _id: params._id,
          semesterName: params.semesterName,
        }
      }
    )
    if (res.ok == 1) {
      ctx.body = {
        total: res.length,
        message: '修改成功',
        data: res,
        code: 200,
        isSucceed: true,
      };
    } else {
      ctx.body = {
        message: '修改失败',
        code: 200,
        isSucceed: false,
      };
    }
  }
  async getCollege() {
    const { ctx } = this;
    const data = await ctx.service.grade.getCollege()
    ctx.body = {
      total: data.length,
      data: data,
      code: 200,
      isSucceed: true,
    }

  }
}

module.exports = GradeController;