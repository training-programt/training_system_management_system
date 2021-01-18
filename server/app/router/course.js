module.exports = app => {
    // 课程
    const { router, controller } = app;
    router.get('/getCourse', controller.course.getCourse);
};