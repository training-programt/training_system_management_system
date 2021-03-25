module.exports = app => {
    // 年级 学期 学院
    const { router, controller } = app;
    router.get('/getGrade', controller.grade.getGrade);
    router.post('/addGrade', controller.grade.addGrade);
    router.post('/delGrade', controller.grade.delGrade);
    router.post('/updateGrade', controller.grade.updateGrade);
    router.get('/getSemester', controller.grade.getSemester);
    router.post('/addSemester', controller.grade.addSemester);
    router.post('/delSemester', controller.grade.delSemester);
    router.post('/updateSemester', controller.grade.updateSemester);
    router.get('/getCollege', controller.grade.getCollege);

    router.get('/getAllGrade', controller.grade.getAllGrade);

};