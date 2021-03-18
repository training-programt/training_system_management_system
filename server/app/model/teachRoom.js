'use strict'
//教研室
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const TeachRoomSchema = new Schema({
    name: { type: String },
    director: {
      type: Schema.Types.ObjectId,
      ref: 'Teacher'
    },
    //教研室教师一对多
    teachers: [{
      type: Schema.Types.ObjectId,
      ref: "Teacher"
    }]
  })

  return mongoose.model('TeachRoom', TeachRoomSchema, 'teachRoom');
}