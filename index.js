var HAProxy = require('haproxy');
var producer = require('godot-producer');

var RedisProducer = module.exports = producer(
  function constructor(options) {
    var self = this;
    self.haproxy = new HAProxy(options.haproxy);
  },
  function produce() {
    var self = this;

    self.haproxy.stat('-1', '-1', '-1', function (err, info) {
      info.forEach(function (section) {
        if (section.pxname === 'stats') {
          return;
        }

        var service = ['haproxy', section.pxname, section.svname].join('/');

        if (section.qcur) {
          self.emit('data', {
            service: service + '/queued-requests',
            description: 'Queued requests',
            metric: parseInt(section.qcur, 10)
          });
        }

        if (section.bin) {
          self.emit('data', {
            service: service + '/bytes-in',
            description: 'Bytes in',
            metric: parseInt(section.bin, 10)
          });
        }

        if (section.bout) {
          self.emit('data', {
            service: service + '/bytes-out',
            description: 'Bytes out',
            metric: parseInt(section.bout, 10)
          });
        }

        if (section.rate) {
          self.emit('data', {
            service: service + '/rate',
            description: 'Request rate',
            metric: parseInt(section.rate, 10)
          });
        }
      });
    });
  }
);
