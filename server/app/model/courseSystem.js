'use strict'
//课程体系表
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const CourseSystemSchema = new Schema({
        course: {
            type: Schema.Types.ObjectId,
            ref: 'BasicCourse'
        },
        leader: {
            type: Schema.Types.ObjectId,
            ref: 'Teacher'
        },
        semester: { type: String },
        grade: {
            type: Schema.Types.ObjectId,
            ref: 'Grade'
        },
        major: {
            type: Schema.Types.ObjectId,
            ref: 'Major'
        },
        degreeCourses: { type: Number, default: 0 },
        engineeringCertification: { type: Number, default: 0 },
        courseType: {
            type: Schema.Types.ObjectId,
            ref: 'CourseType'
        }
    })

    return mongoose.model('CourseSystem', CourseSystemSchema, 'courseSystem');
}