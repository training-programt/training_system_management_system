module.exports = app => {
    // 专业
    const { router, controller } = app;
    router.get('/getMajor', controller.major.getMajor);
};