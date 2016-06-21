function createClusterRepresentativeUserService(execlib, ParentService) {
  'use strict';

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
