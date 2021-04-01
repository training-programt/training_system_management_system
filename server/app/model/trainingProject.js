'use strict'
//培养方案表
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const TrainingProjectSchema = new Schema({
    name: { type: String },
    grade: {
      type: Schema.Types.ObjectId,
      ref: 'Grade'
    },
    major: {//专业表关联
      type: Schema.Types.ObjectId,
      ref: 'Major'
    },
    degree: { type: String },//学位
    system: { type: Number, default: 4 },//学制
    total_credits: { type: Number },//总学分
    writer: {
      type: Schema.Types.ObjectId,
      ref: 'Teacher'
    },//编写者，关联老师
    graduationRequirement: {//关联毕业要求表
      type: Schema.Types.ObjectId,
      ref: 'GraduationRequirement'
    },
    trainingObjective: {//关联培养目标表
      type: Schema.Types.ObjectId,
      ref: 'TrainingObjective'
    },
    majorObjReqRelation: {//专业培养目标与毕业要求关系矩阵
      type: Schema.Types.ObjectId,
      ref: 'MajorObjReqRelation'
    },
    majorNationCoverRelation: {//专业毕业要求与认证标准毕业要求覆盖情况
      type: Schema.Types.ObjectId,
      ref: 'MajorNationCoverRelation'
    },

    core_disciplines: { type: String },//主干学科
    core_curriculum: { type: String },//专业核心课程、一段画？？多选框勾选出来合并成一段话
    practical_teaching_link: { type: String },//主要实践性教学环节
    credits_required: { type: Schema.Types.ObjectId, ref: 'CreditsRequired' },//学分要求表
    remark: { type: String }, // 备注
    state: { // 状态
      type: Number,
      default: 0,
    },
    approver: { // 审批人
      type: Schema.Types.ObjectId,
      ref: 'Teacher'
    }
  })

  return mongoose.model('TrainingProject', TrainingProjectSchema, 'trainingProject');
}