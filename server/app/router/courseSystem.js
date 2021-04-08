module.exports = app => {
  // 课程体系
  const { router, controller } = app;
  router.get('/getCourseSystem', controller.courseSystem.getCourseSystem);
  router.get('/getAllCourseSystem', controller.courseSystem.getAllCourseSystem);
  router.post('/addCourseSystem', controller.courseSystem.addCourseSystem);
  router.post('/updateCourseSystem', controller.courseSystem.updateCourseSystem);
  router.post('/delCourseSystem', controller.courseSystem.delCourseSystem);
  router.post('/delMoreCourseSystem', controller.courseSystem.delMoreCourseSystem);
  router.post('/findCourseSystem', controller.courseSystem.findCourseSystem);
  router.post('/queryCourseSystem', controller.courseSystem.queryCourseSystem);
  router.post('/getCourseBySemester', controller.courseSystem.getCourseBySemester);

};