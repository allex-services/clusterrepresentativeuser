function createUser(execlib, ParentUser) {
  'use strict';
  if (!ParentUser) {
    ParentUser = execlib.execSuite.ServicePack.Service.prototype.userFactory.get('user');
  }

  function User(prophash) {
    ParentUser.call(this, prophash);
  }
  
  var localsinkinfo = require('../localsinkinfo'),
    remotesinkinfo = require('../remotesinkinfo'),
    visiblefields = [],
    lib = execlib.lib,
    qlib = lib.qlib;

  localsinkinfo.forEach(function(localsink){
    visiblefields.push('have'+localsink.name);
  });
  remotesinkinfo.forEach(function(remotesink){
    visiblefields.push('have'+execlib.execSuite.userServiceSuite.nameOfRemoteSinkDescriptor(remotesink));
  });
  ParentUser.inherit(User, require('../methoddescriptors/user'), visiblefields.concat([/*visible state fields here*/]));
  User.prototype.__cleanUp = function () {
    ParentUser.prototype.__cleanUp.call(this);
  };
  User.prototype.reportAccessInfo = function (accessinfo, defer) {
    var ipaddress, port, usertoken;
    if (!accessinfo) {
      defer.reject(new lib.Error('NO_ACCESS_INFO'));
      return;
    }
    if (!accessinfo.ipaddress) {
      defer.reject(new lib.Error('NO_IPADDRESS'));
      return;
    }
    if (!accessinfo.port) {
      defer.reject(new lib.Error('NO_PORT'));
      return;
    }
    if (!accessinfo.tokens) {
      defer.reject(new lib.Error('NO_TOKENS'));
      return;
    }
    if (!accessinfo.tokens.user) {
      defer.reject(new lib.Error('NO_USER_TOKEN'));
      return;
    }
    ipaddress = accessinfo.ipaddress;
    port = accessinfo.port;
    usertoken = accessinfo.tokens.user;
    qlib.promise2defer(this.__service.connectToSelfCluster(ipaddress, port, usertoken), defer);
  };

  return User;
}

module.exports = createUser;
