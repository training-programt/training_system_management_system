'use strict';

exports.security = {
  dominWhiteList: ['http://localhost:9000'],
}

exports.mongoose = {
  url: 'mongodb://127.0.0.1:27017/tsms',
  options: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
}