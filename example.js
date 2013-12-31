var godot = require('godot');
var HAProxyProducer = require('./');

godot.createClient({
  type: 'tcp',
  producers: [
    HAProxyProducer({
      ttl: 1000
    })
  ]
}).connect(1337);
