var
  dispatch = require('yaux'),
  Dispatcher = require('./src/dispatcher')
  dispatcher = null

module.exports = function(action, param) {
  return dispatcher.dispatch(action, param);
}

Object.assign(module.exports, {
  create: function(param) {return new Dispatcher(param);},
  run: function(param) {return dispatcher = new Dispatcher(param)}
})
