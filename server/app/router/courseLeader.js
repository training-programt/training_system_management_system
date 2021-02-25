module.exports = app => {
    // 课程大纲
    const { router, controller } = app;
    router.get('/getSyllabus', controller.courseLeader.getSyllabus);
    router.get('/getTeachGoal', controller.courseLeader.getTeachGoal);
    router.post('/addTeachGoal', controller.courseLeader.addTeachGoal);
    router.post('/delTeachGoal', controller.courseLeader.delTeachGoal);

    router.get('/getRelation', controller.courseLeader.getRelation);
};