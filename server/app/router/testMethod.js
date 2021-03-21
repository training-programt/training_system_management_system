module.exports = app => {
    // 考核环节
    const { router, controller } = app;
    router.get('/getTestMethod', controller.testMethod.getTestMethod);
    router.post('/addTestMethod', controller.testMethod.addTestMethod);
    router.post('/delTestMethod', controller.testMethod.delTestMethod);
    router.post('/updateTestMethod', controller.testMethod.updateTestMethod);

};