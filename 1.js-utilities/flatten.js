// using Recursion :

function flatten(obj) {
  let result = [];

  if (!obj || !Array.isArray(obj)) {
    return [];
  }

  obj.forEach((val) => {
    if (Array.isArray(val)) {
      result.push(...flatten(val));
    } else {
      result.push(val);
    }
  });

  return result;
}

// use reduce() :

function flatten2(obj) {
  return obj.reduce((acc, item) => {
    return acc.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
}

const target = [1, [2, 3, [4, 5]], 6];

const flat = flatten(target);
console.log(flat);

// NOTE
// a `flat` shortcut is :
arr = [1, 2, [3, 4]].flat();
