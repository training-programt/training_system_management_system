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
    college_id: {
      type: Schema.Types.ObjectId,
      ref: 'College'
    },
    major_id: {
      type: Schema.Types.ObjectId,
      ref: 'Major'
    },
    introduce: { type: String},
  })

  TeachRoomSchema.virtual('teacherList', {
    localField: '_id',
    foreignField: 'teachRoom_id',
    justOne: false,
    ref: 'Teacher'
  })

  return mongoose.model('TeachRoom', TeachRoomSchema, 'teachRoom');
}