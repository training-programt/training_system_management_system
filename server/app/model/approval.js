'use strict'
//审批
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ApprovalSchema = new Schema({
    course: {
      type: Schema.Types.ObjectId,
      ref: 'BasicCourse',
    },
    object: { type: String },
    form: { type: String },
    studentNum: { type: Number },
    estimatePassRate: { type: String },
    estimateAverage: { type: String },
    opinion: { type: String },
    state: { type: Number, default: 0 },
    assessmentRelationship: {
      type: Schema.Types.ObjectId,
      ref: 'AssessmentRelationship',
    }
  })

  return mongoose.model('Approval', ApprovalSchema, 'approval');
}