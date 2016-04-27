function createClusterRepresentativeUserService(execlib, ParentServicePack) {
  'use strict';
  var ParentService = ParentServicePack.Service,
    execSuite = execlib.execSuite,
    lib = execlib.lib,
    q = lib.q,
    taskRegistry = execSuite.taskRegistry;

  function factoryCreator(parentFactory) {
    return {
      'service': require('./users/serviceusercreator')(execlib, parentFactory.get('service')),
      'user': require('./users/usercreator')(execlib, parentFactory.get('user')) 
    };
  }

  function ClusterRepresentativeUserService(prophash) {
    ParentService.call(this, prophash);
  }
  
  ParentService.inherit(ClusterRepresentativeUserService, factoryCreator, void 0, {
    local: require('./localsinkinfo'),
    remote: require('./remotesinkinfo')
  });
  
  ClusterRepresentativeUserService.prototype.__cleanUp = function() {
    ParentService.prototype.__cleanUp.call(this);
  };

  return ClusterRepresentativeUserService;
}

module.exports = createClusterRepresentativeUserService;
