# log-timer
Log Timer for NodeJS

## Installation

    $ npm install log-timer

## Example
```javascript
const LT = require('log-timer');

const t = new LT("application", {partial: false});

let redis_end = t.tick("redis was connected");
setTimeout(function() {
  redis_end();
}, 10);

let mysql_end = t.tick("mysql was connected");
setTimeout(function() {
  mysql_end();
}, 33);

let keys_end = t.tick();
setTimeout(function() {
  keys_end("1024 api keys was loaded");
}, 12);

let conf_end = t.tick("config was reloaded");
setTimeout(function() {
  conf_end();
}, 25);

setTimeout(function() {
  t.end();
}, 100);
```

## Output
```
[timer]  application
  [tick][10ms]   redis was connected
  [tick][33ms]   mysql was connected
  [tick][12ms]   1024 api keys was loaded
  [tick][25ms]   config was reloaded
[timer][100ms]  application
```

## Options
* `partial`: partial output. (Default: `false`)
* `format`: common output format. (Default: `[timer][%sms]`)
* `start_format`: header format if many ticks. (Default: `[timer]`)
* `end_format`: footer format if many ticks. (Default: `[timer][%sms]`)
* `tick_format`: tick output format. (Default: `[tick][%sms]`)

## API
* `const t = new LT('optional name', options)`: call to create new timer. `options` is not required.
* `t.end('optional name')`: call for end of timer.
* `t.ms()`: call to retrieve current milliseconds from the begin.
* `t.sec()`: call to retrieve current seconds from the begin.
* `const tick_end = t.tick('optional name')`: call to create sub-timer.
* `tick_end('optional name')`: call for end of sub-timer.

## License

This project is licensed under the MIT license.
