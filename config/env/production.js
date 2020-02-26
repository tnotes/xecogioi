module.exports = {
  datastores: {
    default: {
       adapter: 'sails-mongo',
       url: 'mongodb://localhost:27017/vf',
    },
  },

  models: {
    migrate: 'safe',
  },

  blueprints: {
    shortcuts: false,
  },

  security: {
    cors: {
       allowOrigins: []
    },
  },

  session: {

    // adapter: 'connect-redis',
    // url: 'redis://user:password@localhost:6379/dbname',

    cookie: {
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,  // 24 hours
    },

  },

  sockets: {
     onlyAllowOrigins: [],

    // adapter: 'socket.io-redis',
    // url: 'redis://user:password@bigsquid.redistogo.com:9562/dbname',
  },

  log: {
    level: 'debug'
  },

  http: {
    cache: 365.25 * 24 * 60 * 60 * 1000, // One year

    // trustProxy: true,

  },

   port: 80,

  // ssl: undefined,

  custom: {

  }
};
