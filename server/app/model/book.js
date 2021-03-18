'use strict'
//参考书
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const BookSchema = new Schema({
      name:{type:String}
  })
  return mongoose.model('Book', BookSchema, 'book');
}