module.exports = app => {
  // 课程类别
  const { router, controller } = app;
  router.get('/getCourseType', controller.courseType.getCourseType);
  router.get('/getAllCourseType', controller.courseType.getAllCourseType);
  router.post('/addCourseType', controller.courseType.addCourseType);
  router.post('/updateCourseType', controller.courseType.updateCourseType);
  router.post('/delCourseType', controller.courseType.delCourseType);
  router.post('/delMoreCourseType', controller.courseType.delMoreCourseType);
};