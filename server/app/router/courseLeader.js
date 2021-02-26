module.exports = app => {
    // 课程大纲
    const { router, controller } = app;
    router.get('/getSyllabus', controller.courseLeader.getSyllabus);
    router.get('/getTeachGoal', controller.courseLeader.getTeachGoal);
    router.post('/addTeachGoal', controller.courseLeader.addTeachGoal);
    router.post('/delTeachGoal', controller.courseLeader.delTeachGoal);
    //对应关系
    router.get('/getRelation', controller.courseLeader.getRelation);
    //专业毕业要求
    router.get('/getMajorRequirement', controller.courseLeader.getMajorRequirement);
    //指标点
    router.get('/getPoint', controller.courseLeader.getPoint);
    //理论表
    router.get('/getTheory', controller.courseLeader.getTheory);


};