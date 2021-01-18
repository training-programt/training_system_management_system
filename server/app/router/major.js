module.exports = app => {
    // 专业
    const { router, controller } = app;
    router.get('/getMajor', controller.major.getMajor);
    router.post('/queryMajor', controller.major.queryMajor);
    router.post('/addMajor', controller.major.addMajor);
    router.post('/delMajor', controller.major.delMajor);
    router.post('/updateMajor', controller.major.updateMajor);

};