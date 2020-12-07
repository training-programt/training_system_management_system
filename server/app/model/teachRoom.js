'use strict'
//教研室
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const TeachRoomSchema = new Schema({
    id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String },
    count: { type: Number },
    //教研室主任是被指定？？？？怎么写？？
    director: {
      type: String,
      // ref: 'Teacher'
    },
    college: {
      type: String,
      ref: 'College'
    },
    major: {
      type: Schema.Types.ObjectId,
      ref: 'Major'
    },
    introduce: { type: String },
    //教研室教师一对多
    teachers: [{
      type: Schema.Types.ObjectId,
      ref: "teacher"
    }]
  })

  return mongoose.model('TeachRoom', TeachRoomSchema, 'teachRoom');
}