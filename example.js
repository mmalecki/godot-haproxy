var godot = require('godot');
var HAProxyProducer = require('./');

godot.createClient({
  type: 'tcp',
  producers: [
    HAProxyProducer({
      redis: {
        host: '127.0.0.1',
        port: 6379
      },
      ttl: 1000
    })
  ]
}).connect(1337);
