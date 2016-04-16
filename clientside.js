function createClientSide(execlib) {
  'use strict';
  var execSuite = execlib.execSuite,
  userServicePack = execSuite.registry.get('allex_userservice'),
  ParentServicePack = userServicePack;

  return {
    SinkMap: require('./sinkmapcreator')(execlib, ParentServicePack)
  };
}

module.exports = createClientSide;
