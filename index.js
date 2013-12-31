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

        if (section.ereq) {
          self.emit('data', {
            service: service + '/request-errors',
            description: 'Request errors',
            metric: parseInt(section.ereq, 10)
          });
        }

        if (section.econ) {
          self.emit('data', {
            service: service + '/connection-errors',
            description: 'Connection errors',
            metric: parseInt(section.econ, 10)
          });
        }

        if (section.eresp) {
          self.emit('data', {
            service: service + '/response-errors',
            description: 'Response errors',
            metric: parseInt(section.eresp, 10)
          });
        }

        if (section.hrsp_1xx) {
          self.emit('data', {
            service: service + '/http-1xx',
            description: '1xx HTTP responses',
            metric: parseInt(section.hrsp_1xx, 10)
          });
        }

        if (section.hrsp_2xx) {
          self.emit('data', {
            service: service + '/http-2xx',
            description: '2xx HTTP responses',
            metric: parseInt(section.hrsp_2xx, 10)
          });
        }

        if (section.hrsp_3xx) {
          self.emit('data', {
            service: service + '/http-3xx',
            description: '3xx HTTP responses',
            metric: parseInt(section.hrsp_3xx, 10)
          });
        }

        if (section.hrsp_4xx) {
          self.emit('data', {
            service: service + '/http-4xx',
            description: '4xx HTTP responses',
            metric: parseInt(section.hrsp_4xx, 10)
          });
        }

        if (section.hrsp_5xx) {
          self.emit('data', {
            service: service + '/http-5xx',
            description: '5xx HTTP responses',
            metric: parseInt(section.hrsp_5xx, 10)
          });
        }
      });
    });
  }
);
