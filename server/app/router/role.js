module.exports = app => {
    // 角色
    const { router, controller } = app;
    router.get('/getRole', controller.role.getRole);

};