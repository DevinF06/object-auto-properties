function duplicateObject(o, ...t) {
  var d = Object.getOwnPropertyDescriptors(o), r = Object.defineProperties(typeof o.constructor == 'function' ? o.constructor() : {}, d), k;
  for (k in d) {
    if (!d[k].get && r[k] !== null && typeof r[k] == 'object' && t.indexOf(r[k]) < 0) r = Object.defineProperty(r, k, {
      value: duplicateObject(r[k], ...t, r[k]),
      writable: d[k].writable,
      enumerable: d[k].enumerable,
      configurable: d[k].configurable
    });
  }
  return r;
}

function autoDefineProperties(o, p) {
  var r = duplicateObject(o), k;
  for (k in p) {
    r = autoDefineProperty(r, k, p[k])
  }
  return r;
}

function autoDefineProperty(o, k, {value, writable = true, enumerable = true, configurable = true} = {}) {
  return Object.defineProperty(o, k, {
    get() {return typeof value == 'function' ? value() : value},
    set(v) {if (writable) o = autoDefineProperty(o, k, v)},
    enumerable,
    configurable
  })
}

exports.duplicateObject = duplicateObject;
exports.autoDefineProperties = autoDefineProperties;
exports.autoDefineProperty = autoDefineProperty;