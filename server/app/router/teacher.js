module.exports = app => {
    // 教师
    const { router, controller } = app;
    router.get('/getTeacher', controller.teacher.getTeacher);
    router.get('/addTeacher', controller.teacher.addTeacher);
    router.get('/delTeacher', controller.teacher.delTeacher);


};