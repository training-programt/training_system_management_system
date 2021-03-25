module.exports = app => {
  // 授课信息
  const { router, controller } = app;
  router.get('/getTeachingInfo', controller.teachingInfo.getTeachingInfo);
  router.get('/getAllTeachingInfo', controller.teachingInfo.getAllTeachingInfo);
  router.get('/getTeachingInfoByTeacher', controller.teachingInfo.getTeachingInfoByTeacher);
  router.post('/addTeachingInfo', controller.teachingInfo.addTeachingInfo);
  router.post('/updateTeachingInfo', controller.teachingInfo.updateTeachingInfo);
  router.post('/delTeachingInfo', controller.teachingInfo.delTeachingInfo);
  router.post('/delMoreTeachingInfo', controller.teachingInfo.delMoreTeachingInfo);
};