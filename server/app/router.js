'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/home')(app)
  require('./router/menu')(app)
  require('./router/major')(app)
  require('./router/role')(app)
  require('./router/teacher')(app)
  require('./router/courseType')(app)
  require('./router/courseSystem')(app)

  // require('./router/test')(app)
  require('./router/course')(app)
  // require('./router/teachRoom')(app)
  require('./router/grade')(app)
  // require('./router/nationalRequirement')(app)
  // require('./router/courseLeader')(app)
  // require('./router/trainingProject')(app)
  // require('./router/point')(app)
  // require('./router/table')(app)
  // require('./router/teachingRecord')(app)
  // require('./router/majorObjective')(app)
};
