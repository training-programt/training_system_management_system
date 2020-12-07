'use strict'
//培养方案表
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const TrainingProjectSchema = new Schema({
    id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String },
    year: {//年级表关联
      type: Schema.Types.ObjectId,
      ref: 'Grade'
    },
    major: {//专业表关联
      type: Schema.Types.ObjectId,
      ref: 'Major'
    },
    degree:{type:String},//学位
    system:{type:Number,default:4},//学制
    total_credits:{type:Number},//总学分
    writer: {
      type: Schema.Types.ObjectId,
      ref: 'Teacher'
    },//编写者，关联老师
    graducationRequirement: [{//关联毕业要求表
      type: Schema.Types.ObjectId,
      ref: 'GraducationRequirement'
    }],
    trainingObjective: {//关联培养目标表
      type: Schema.Types.ObjectId,
      ref: 'TrainingObjective'
    },
    core_disciplines:{type:String},//主干学科
    core_curriculum:{type:String},//专业核心课程、一段画？？多选框勾选出来合并成一段话
    practical_teaching_link:{type:String},//主要实践性教学环节
    credits_required:{type:Schema.Types.ObjectId,ref:'CreditsRequired'},//学分要求表
    //课程研修计划可以生成？那需不需要保存下来，放在表格里面，还有一个第二课程的文字表达
  })

  return mongoose.model('TrainingProject', TrainingProjectSchema, 'TrainingProject');
} 