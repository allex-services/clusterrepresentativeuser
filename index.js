function createServicePack(execlib) {
  'use strict';

  return {
    service : {
      dependencies : ['allex:user']
    },
    sinkmap : {
      dependencies : ['allex:user']
    },
    tasks : {
      dependencies : []
    }
  };
}

module.exports = createServicePack;

