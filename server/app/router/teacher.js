module.exports = app => {
    // 教师
    const { router, controller } = app;
    router.get('/getTeacherList', controller.teacher.getTeacherList);
    router.get('/getTeacher', controller.teacher.getTeacher);
    router.get('/getAllTeacher', controller.teacher.getAllTeacher);
    router.post('/addTeacher', controller.teacher.addTeacher);
    router.post('/addTeacher1', controller.teacher.addTeacher1);
    router.post('/findTeacher', controller.teacher.findTeacher);
    router.post('/queryTeacher', controller.teacher.queryTeacher);
    router.post('/delTeacher', controller.teacher.delTeacher);
    router.post('/delTeacher1', controller.teacher.delTeacher1);
    router.post('/updataTeacher1', controller.teacher.updataTeacher1);
    router.post('/updataTeacher', controller.teacher.updataTeacher);
    router.post('/manyDelete', controller.teacher.manyDelete);
    router.post('/getUserInfo', controller.teacher.getTeacherDetail);

};