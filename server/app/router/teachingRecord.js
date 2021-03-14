module.exports = app => {
  // 授课记录
  const { router, controller } = app;
  router.get('/getTeachingRecord', controller.teachingRecord.getTeachingRecord);

};