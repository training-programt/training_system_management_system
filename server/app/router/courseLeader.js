module.exports = app => {
    // 课程大纲
    const { router, controller } = app;
    router.get('/getSyllabus', controller.courseLeader.getSyllabus);
};