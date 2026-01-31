// in memoize, the concept of memoization is executed through use of a key-value pair (i.e., object) in lexical scope to a closure.

function slowAdd(a, b) {
  console.log("calculating ...");
  return a + b;
}

function memoize(fn) {
  const cache = {};

  return function (...args) {
    const key = JSON.stringify(args);

    if (key in cache) return cache[key];

    return (cache[key] = fn.apply(this, args));
  };
}

// u can make it even shorter as :

function memoizer(fn) {
  const cache = {};

  return function (...args) {
    const key = JSON.stringify(args);
    return key in cache ? cache[key] : (cache[key] = fn.apply(this, args));
  };
}
