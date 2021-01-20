module.exports = app => {
    // 教师
    const { router, controller } = app;
    router.get('/getTeacher', controller.teacher.getTeacher);
    router.post('/addTeacher', controller.teacher.addTeacher);
    router.post('/queryTeacher', controller.teacher.queryTeacher);
    router.post('/delTeacher', controller.teacher.delTeacher);
    router.post('/updataTeacher', controller.teacher.updataTeacher);


};