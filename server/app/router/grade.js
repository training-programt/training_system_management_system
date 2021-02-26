module.exports = app => {
    // 年级 学期 学院
    const { router, controller } = app;
    router.get('/getGrade', controller.grade.getGrade);
    router.get('/getSemester', controller.grade.getSemester);
    router.get('/getCollege', controller.grade.getCollege);
};