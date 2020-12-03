'use strict'
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const MajorSchema = new Schema({
    code: { type: String, unique: true, required: true },
    name: { type: String },
    introduce: { type: String },

    college_id: {
      type: Schema.Types.ObjectId,
      ref: 'College'
    }
  })

  MajorSchema.virtual('teachRoom', {
    localField: '_id',
    foreignField: 'major_id',
    justOne: false,
    ref: 'TeachRoom'
  })

  MajorSchema.virtual('trainingProject', {
    localField: '_id',
    foreignField: 'major_id',
    justOne: false,
    ref: 'TrainingProject'
  })

  return mongoose.model('Major', MajorSchema, 'major');
}