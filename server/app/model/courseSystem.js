'use strict'
//课程体系表
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const CourseSystemSchema = new Schema({
        name: { type: String },
        creditStructure: [
            {
                type: Schema.Types.ObjectId,
                ref: 'CreditStructure'
            }
        ],
        courses: [//课程体系和课程相关联，为了 本专业课程体系与毕业要求的关联度矩阵
            {
                type: Schema.Types.ObjectId,
                ref: 'Course'
            }
        ]
    })

    return mongoose.model('CourseSystem', CourseSystemSchema, 'courseSystem');
}