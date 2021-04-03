'use strict'
//审批
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ApprovalSchema = new Schema({
    course: {
      type: Schema.Types.ObjectId,
      ref: 'CourseSystem',
    },
    inspectionObject: { type: String },
    inspectionForm: { type: String },
    studentNum: { type: Number },
    estimatePassRate: { type: String },
    estimateAverage: { type: String },
    opinion: { type: String },
    state: { type: Number, default: 0 },//0未审核，1已审核
    standard: [{
      type: Schema.Types.ObjectId,
      ref: 'Standard',
    }]
  })

  return mongoose.model('Approval', ApprovalSchema, 'approval');
}