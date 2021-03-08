module.exports = app => {
    // 课程
    const { router, controller } = app;
    router.get('/getCourse', controller.course.getCourse);
    router.post('/addCourse', controller.course.addCourse);
    router.post('/delCourse', controller.course.delCourse);
    router.get('/getCourseSystem',controller.course.getCourseSystem)
};