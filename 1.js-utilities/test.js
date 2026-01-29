const { initial } = require("lodash");

const arr = [1, 2, 3];

console.log(
  arr.reduce((acc, item) => {
    return acc;
  }, initialItem)
);

// making a groupBy function

function groupBy(arr, key) {
  return arr.reduce((acc, obj) => {
    const objValue = obj[key];

    if (!acc[objValue]) {
      acc[key] = [];
    }

    acc[objValue].push(obj);
    return acc;
  }, {});
}
