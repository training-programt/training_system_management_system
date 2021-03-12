module.exports = app => {
    // 课程
    const { router, controller } = app;
    router.get('/getCourse', controller.course.getCourse);
    router.get('/getAllCourse', controller.course.getAllCourse);
    router.post('/addCourse', controller.course.addCourse);
    router.post('/delCourse', controller.course.delCourse);
    router.post('/updateCourse', controller.course.updateCourse);
    router.post('/delMany', controller.course.delMany);
    router.get('/getCourseSystem',controller.course.getCourseSystem)
};