'use strict'
// 专业表
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const MajorSchema = new Schema({
    name: { type: String },
    code: { type: String },
    introduce: { type: String },
    // count: [{ 
    //   type: Schema.Types.ObjectId,
    //   ref: 'Student',
    // }],
  })

  return mongoose.model('Major', MajorSchema, 'major');
}