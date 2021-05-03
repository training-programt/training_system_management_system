module.exports = app => {
    // 主页和登录
    const { router, controller } = app;
    // router.get('/', controller.home.index);
    router.post('/login', controller.login.login)
    router.post('/modifyPwd', controller.login.modifyPwd)

};