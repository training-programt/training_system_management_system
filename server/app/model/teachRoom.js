'use strict'
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const TeachRoomSchema = new Schema({
    name: {type: String},
    director: {
      type: String,
      ref: 'Teacher'
    },
    type: { type: String},
    college: {
      type: String,
      ref: 'College'
    },
    major: {
      type: String,
      ref: 'Major'
    },
    introduce: { type: String},
  })

  TeachRoomSchema.virtual('teacherList', {
    localField: '_id',
    foreignField: 'teachRoom',
    justOne: false,
    ref: 'Teacher'
  })

  return mongoose.model('TeachRoom', TeachRoomSchema, 'teachRoom');
}