module.exports = app => {
    // 教师
    const { router, controller } = app;
    router.get('/addTeacher', controller.teacher.addTeacher);

};