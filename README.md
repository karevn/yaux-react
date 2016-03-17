# yaux-react

yaux-react is a very lightweight container for React.js based JavaScript apps.

With yaux-react, you can write applications without fighting the framework, and
just focus on your domain. It's very testable, predictable, and has overall
great developer experience.

And yes, it's VERY tiny. Literally below 100 lines of code.

### Influences

Yaux-react is highly influenced by [Redux](http://redux.js.org) state management
library and implements the same ideas in even more minimalistic way. So
you don't need to deal with endless `switch` statements anymore and can
create better structured store code.

### Installation

To install the stable version for React:

```
npm install --save yaux-react
```


This assumes that you’re using [npm](https://www.npmjs.com/) package manager with a module bundler like [Webpack](http://webpack.github.io) or [Browserify](http://browserify.org/) to consume [CommonJS modules](http://webpack.github.io/docs/commonjs.html).


### The Gist

The whole state of your app is stored in an object tree.  The only way to
change the state tree is to emit an *action*, an object describing what
happened. When action is emitted, it's data is handled by *action creators*
and then processed through *stores*

That’s it!

First, let's define a store for our TODO list:

```js
var store = {
  // This action adds a new item to TODO by inserting it into the array
  add: function (state, item) {
    state.items.push(item)
  },
  // This action removes an item from the TODO by its index
  remove: function (state, index) {
    state.items.splice(index, 1)
  },
  // Update item text
  update: function (state, param) {
    state.items[param.index] = param.text
    // You can return the state, or return nothing to modify the state
    // "in-place". It's recommended to return the state, though:
    return state
  }
  // etc
},
  initialState = {items: []},
  rootElement = document.createElement('DIV'),
  dispatch = require('yaux-react'),
  rootReactComponent = React.createClass({
    onUpdate: function(e, index) {

    },
    render: function () {
      var _this = this
      return (
        <ul>
          {this.props.items.map(function(item, index){
            <li key={index}>
              <input onKeyUp={function(e) {
                dispatch('update', {index: index, text: e.target.value)} />
              <button onClick={
                function(e) {dispatch('delete', index)}} />Delete</button>
            </li>
          })}
        </ul>
        <button onClick={dispatch('add', 'New item')}>Add</button>
      )
    }
  })
// We append the root element to be used by React rendering to the document
document.body.appendChild(rootElement)
// The magic begins - we start Nux app
dispatch.run({
  // A container element for the app
  container: rootElement,
  // An initial state is passed to the Nux instance
  state: initialState,
  // Root React component to be used
  'class': rootReactComponent,
  // The list of stores to be used
  stores: [store],
  // The list of action factories to be used. Empty for this simple example.
  factories: []
})
```

So, when you need to mutate an application state, you call `nux` function with
the first parameter representing action name, and the second parameter
representing action parameters. Then, the current application state is run
through all the stores, and when all the processing is done - an application
state is updated.


### License

MIT
