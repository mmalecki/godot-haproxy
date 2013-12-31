# godot-haproxy
HAProxy producer for Godot.

## Installation

```bash
npm install godot-haproxy
```

## Usage
```js
var godot = require('godot');
var HAProxyProducer = require('godot-haproxy');

godot.createClient({
  type: 'tcp',
  producers: [
    HAProxyProducer({
      ttl: 1000
    })
  ]
}).connect(1337);
```
