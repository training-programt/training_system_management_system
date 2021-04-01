module.exports = app => {
  // 表格
  const { router, controller } = app;
  router.post('/jys/tableOne', controller.table.majorObjReqRelation);
  router.post('/jys/tableTwo', controller.table.majorNationCoverRelation);

  router.post('/jys/getMajorObjReqRelation', controller.table.getMajorObjReqRelation);
  router.post('/jys/getMajorNationCoverRelation', controller.table.getMajorNationCoverRelation);

};