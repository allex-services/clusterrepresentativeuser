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

  ClusterRepresentativeUserService.prototype.connectToSelfCluster = function (ipaddress, port, token) {
    var d = q.defer();
    taskRegistry.run('acquireSink', {
      connectionString: 'ws://'+ipaddress+':'+port,
      identity: {ip: {name: this.name, role: 'user', token: token}},
      onSink: this.onSelfClusterSink.bind(this, d),
      onCannotConnect: console.error.bind(console, 'ooops'),//d.reject.bind(d),
      singleshot: true
    });
    return d.promise;
  };

  ClusterRepresentativeUserService.prototype.onSelfClusterSink = function (defer, sink) {
    if (!sink) {
      defer.reject(new lib.Error('NO_CLUSTER_SINK'));
      return;
    }
    var d = q.defer();
    d.promise.then(
      defer.resolve.bind(defer, true),
      defer.reject.bind(defer)
    );
    this._onStaticallyStartedSubService(d, 'Cluster', sink);
  };
  
  return ClusterRepresentativeUserService;
}

module.exports = createClusterRepresentativeUserService;
