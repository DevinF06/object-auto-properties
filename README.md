# object-auto-properties
Some functions that deal with object properties

## How to use
Install through npm with
```
npm i DevinF06/object-auto-properties
```
Require the module in your code

```js
const objectProperties = require('object-auto-properties');

// or

const { duplicateObject, autoDefineProperties, autoDefineProperty } = require('object-auto-properties');
```

## Functions
### duplicateObject(o)
Duplicates object `o`, including properties and nested objects

```js
const { duplicateObject } = require('object-auto-properties');
var foo = {obj: {num: 1}}, bar = duplicateObject(foo);

bar.obj.num = 2;
console.log(foo.obj.num == bar.obj.num); // false
```

### autoDefineProperties(o, p)
Defines "autoProperties" `p` in object `o`

For better reference see [`Object.defineProperties`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties) and `autoDefineProperty`

```js
const { autoDefineProperties } = require('object-auto-properties');
var object = {}, foo = 1;
object = autoDefineProperties(foo, {
  foo: {value: () => `foo is ${foo}`},
  bar: {value: 'text'}
});

foo = 2;
console.log(object.foo); // foo is 2
console.log(object.bar); // text
```

### autoDefineProperty(o, k, v)
Defines "autoProperty" `k` in object `o` with property `v`

"autoProperties" are like regular object properties, except that if their value is a function, they will evaluate it

When "autoProperties" are defined they will remain until removed (with `delete object.foo` or ect.)

```js
const { autoDefineProperty } = require('object-auto-properties');
var object = {}, foo = 1;
object = autoDefineProperty(object, 'foo', {value: 'bar'});
console.log(object.foo); // bar

object.foo = () => `foo is ${foo}`;
foo = 2;
console.log(object.foo) // foo is 2
```
