function createServicePack(execlib) {
  'use strict';

  return {
    service: {
      dependencies: ['allex_userservice']
    },
    sinkmap: {
      dependencies: ['allex_userservice']
    }
  };
}

module.exports = createServicePack;

