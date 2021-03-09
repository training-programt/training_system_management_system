'use strict'
//学院表
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const CollegeSchema = new Schema({
    name: { type: String },
    introduce: { type: String },
    // majorList: [{//专业
    //   type: Schema.Types.ObjectId,
    //   ref: 'Major'
    // }],
    // teachRoomList: [{//教研室
    //   type: Schema.Types.ObjectId,
    //   ref: 'TeachRoom'
    // }],
    courseList: [{//课程
      type: Schema.Types.ObjectId,
      ref: 'Course'
    }],
  })

  CollegeSchema.virtual('majorList', {
    localField: '_id',
    foreignField: 'college_id',
    justOne: false,
    ref: 'Major'
  })

  CollegeSchema.virtual('teachRoomList', {
    localField: '_id',
    foreignField: 'college_id',
    justOne: false,
    ref: 'TeachRoom'
  })
//学院和课程相关联
  // CollegeSchema.virtual('courseList', {
  //   localField: '_id',
  //   foreignField: 'unit',
  //   justOne: false,
  //   ref: 'Course'
  // })

  return mongoose.model('College', CollegeSchema, 'college');
}