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
