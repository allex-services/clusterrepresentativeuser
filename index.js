function createServicePack(execlib) {
  'use strict';

  return {
    service: {
      dependencies: ['allex:user']
    },
    sinkmap: {
      dependencies: ['allex:user']
    }
  };
}

module.exports = createServicePack;

