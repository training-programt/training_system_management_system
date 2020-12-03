module.exports = app => {
  const mongoose = app.mongoose;
  const PostSchema = new mongoose.Schema({
    name: { type: String },
  })

  PostSchema.virtual('teacherList', {
    localField: '_id',
    foreignField: 'post_id',
    justOne: false,
    ref: 'Teacher'
  })

  return mongoose.model('Post', PostSchema, 'post');
}