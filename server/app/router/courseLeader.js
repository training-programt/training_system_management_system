module.exports = app => {
    // 课程大纲
    const { router, controller } = app;
    router.get('/getSyllabus', controller.courseLeader.getSyllabus);
    router.get('/getAllSyllabus', controller.courseLeader.getAllSyllabus);
    router.post('/updateSyllabusState', controller.courseLeader.updateSyllabusState);
    router.post('/findSyllabus', controller.courseLeader.findSyllabus);
    router.post('/findSyllabusById', controller.courseLeader.findSyllabusById);
    router.post('/addSyllabus', controller.courseLeader.addSyllabus);
    router.post('/updateSyllabus', controller.courseLeader.updateSyllabus);
    router.post('/delSyllabus', controller.courseLeader.delSyllabus);
    //教学目标
    router.get('/getTeachGoal', controller.courseLeader.getTeachGoal);
    router.post('/addTeachGoal', controller.courseLeader.addTeachGoal);
    router.post('/delTeachGoal', controller.courseLeader.delTeachGoal);
    //对应关系
    router.get('/getRelation', controller.courseLeader.getRelation);
    router.post('/addRelation', controller.courseLeader.addRelation);
    //专业毕业要求
    router.get('/getMajorRequirement', controller.courseLeader.getMajorRequirement);
    //指标点
    router.get('/getPoint', controller.courseLeader.getPoint);
    //理论表
    router.get('/getTheory', controller.courseLeader.getTheory);
    //实践表
    router.get('/getPractice', controller.courseLeader.getPractice);
    //对应关系
    router.get('/getGoalAndAssessment', controller.courseLeader.getGoalAndAssessment);

    
};