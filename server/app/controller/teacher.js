'use strict';
const Controller = require('egg').Controller;

class TeacherController extends Controller {
  async getTeacher() {
    const { ctx } = this;
    const data = await ctx.service.teacher.getTeacher()
    // console.log(data)
    ctx.body = {
      total: data.length,
      data: data,
      code: 200,
      isSucceed: true,
    }
  }
  async findTeacher() {
    const { ctx } = this;
    const params =await ctx.request.body
    const data = await ctx.model.Teacher.findOne({ _id: params._id })
    .populate('course')
    .sort()
    ctx.body = {
      total: data.length,
      data: data,
      code: 200,
      isSucceed: true,
    }
  }
  async getAllTeacher() {
    const { ctx } = this;
    const params = ctx.request.query
    const data = await ctx.service.teacher.getAllTeacher(params)
    ctx.body = {
      total: data.length,
      data: data,
      code: 200,
      isSucceed: true,
    }
  }

  async addTeacher() {
    const { ctx } = this;
    let params = await ctx.request.body;
    console.log(params)
    const teachers = await ctx.service.teacher.addTeacher(params)
    const teachRoom = await ctx.model.TeachRoom.update(
      { _id: params.teachRoom },
      {
        $push: {
          teachers: teachers[0]._id
        }
      },
      { multi: true }
    )
    const major = await ctx.model.Major.update(
      { _id: params.major },
      {
        $push: {
          teachers: teachers[0]._id
        }
      },
      { multi: true }
    )
    if (teachers.length >= 0) {
      ctx.body = {
        total: teachers.length,
        data: teachers,
        code: 200,
        isSucceed: true,
        message: '新增成功',
      }
    } else {
      ctx.body = {
        code: 500,
        isSucceed: false,
        message: '新增失败',
      }
    }


  }

  async delTeacher() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.teacher.delTeacher(params)
    const teachRoom = await ctx.model.TeachRoom.update(
      { _id: params.teachRoom },
      {
        $pull: {
          teachers: params._id
        }
      },
      { multi: true }
    )
    const major = await ctx.model.Major.update(
      { _id: params.major },
      {
        $pull: {
          teachers: params._id
        }
      },
      { multi: true }
    )
    console.log(res)
    if (res.ok == 1) {
      ctx.body = {
        code: 200,
        isSucceed: true,
        message: '删除成功'
      };
    } else {
      ctx.body = {
        code: 500,
        isSucceed: false,
        message: '删除失败'
      };
    }

  }

  async updataTeacher() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log(params)
    const find = await ctx.model.Teacher.find({ _id: params._id })
    console.log(find)
    if (params.major !== find[0].major) {
      const majorChange = await ctx.model.Major.update(
        { _id: find[0].major },
        {
          $pull: {
            teachers: params._id
          }
        },
      )
      const newChange = await ctx.model.Major.update(
        { _id: params.major },
        {
          $push: {
            teachers: params._id
          }
        },
      )
    }
    if (params.teachRoom !== find[0].teachRoom) {
      const teachRoomChange = await ctx.model.TeachRoom.update(
        { _id: find[0].teachRoom },
        {
          $pull: {
            teachers: params._id
          }
        },
      )
      const newChange = await ctx.model.TeachRoom.update(
        { _id: params.teachRoom },
        {
          $push: {
            teachers: params._id
          }
        },
      )
    }
    const data = await ctx.model.Teacher.findByIdAndUpdate(
      { _id: params._id },
      {
        $set: {
          name: params.name,
          password: params.password,
          sex: params.sex,
          birthday: params.birthday,
          course: params.course,
          job: params.job,
          position: params.position,
          lastInfo: params.lastInfo,
          graduateSchool: params.graduateSchool,
          researchDirection: params.researchDirection,
          professional: params.professional,
          degree: params.degree,
          teachRoom: params.teachRoom,
          major: params.major
        }
      })
    console.log(data)
    ctx.body = {
      total: data.length,
      data: data,
      code: 200,
      isSucceed: true,
    }
  }
  async updataTeacher1() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log(params)
    const data = await ctx.model.Teacher.findByIdAndUpdate(
      { _id: params._id },
      {
        $set: {
          name: params.name,
          role: params.role,
          password: params.password,
        }
      })
    ctx.body = {
      total: data.length,
      data: data,
      code: 200,
      isSucceed: true,
    }
  }
  async queryTeacher() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log(params)
    const reg = new RegExp(params.name, 'i')
    const res = await ctx.model.Teacher.find(
      {
        $or: [
          { name: { $regex: reg } },
          { job: params.job },
          { teachRoom: params.teachRoom },
          { position: params.position }
        ]
      }
    );
    ctx.body = {
      total: res.length,
      data: res,
      code: 200,
      isSucceed: true,
      message: '查询成功',
    };
  }

  async manyDelete() {
    const { ctx } = this;
    const params = ctx.request.body;
    const deleteMany = await ctx.service.teacher.delTeacher({ _id: { $in: params } })
    for (let i = 0; i < params.length; i++) {
      const teachRoom = await ctx.model.TeachRoom.update(
        { _id: params[i].teachRoom._id },
        {
          // $pull: {
          //   teachers:  {$each: params}
          // }
          $pull: {
            teachers: params[i]._id
          }
        },
        { multi: true }
      )
      const major = await ctx.model.Major.update(
        { _id: params[i].major._id },
        {
          $pull: {
            teachers: params[i]._id
          }
        },
        { multi: true }
      )
    }

    if (deleteMany.ok == 1) {
      ctx.body = {
        total: deleteMany.length,
        data: deleteMany,
        code: 200,
        isSucceed: true,
        message: '删除成功' + deleteMany.deletedCount + '条数据',
      };
    } else {
      ctx.body = {
        code: 500,
        isSucceed: true,
        message: '批量删除失败',
      };
    }

  }

  async getTeacherDetail() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.teacher.getTeacherDetail(params)
    ctx.body = {
      total: 0,
      data: res,
      code: 200,
      isSucceed: true,
    }
  }
}

module.exports = TeacherController;