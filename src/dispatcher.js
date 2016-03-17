var
  ReactDOM = require('react-dom'),
  React = require('react'),
  dispatch = require('yaux')
  nextTick = function(func) {setTimeout(func, 0);}
function Dispatcher(param) {
  var defaults = {
    factories: [],
    stores: [],
    props: {}
  }, _this = this;
  Object.assign(defaults, param);
  Object.assign(this, defaults);
  nextTick(function() {return _this.setProps(_this.props);});
}

Object.assign(Dispatcher.prototype, {
  setProps: function(props) {
    this.props = props
    return ReactDOM.render(
      React.createElement(this["class"], props),
      this.container)
  },
  unmount: function() {
    ReactDOM.unmountComponentAtNode(this.container);
    if (this.onUnmount) {
      return this.onUnmount();
    }
  },
  dispatch: function(action, params) {
    var _this = this;
    return dispatch(this.factories, this.stores, this.props, action, params)
    .then(function(props) {
      if (props && action !== 'unmount') {
        _this.setProps(props);
      } else if (action === 'unmount') {
        _this.unmount();
      }
      return props;
    })["catch"](function(error) {
      return console.info(error);
    });
  }

})

module.exports = Dispatcher
