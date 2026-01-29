// this is a utility file to deep clone values/variables of any data type.

function deepClone(obj) {
  if (obj == null || typeof obj !== "object") return obj;

  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  if (obj instanceof Set) {
    return new Set(obj.values());
  }

  if (obj instanceof Map) {
    return new Map([...obj].map(([k, v]) => [k, v]));
  }

  const result = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    result[key] = deepClone(obj[key]);
  }

  return result;
}

// EASY test
// const wow = {
//   name: "kenny",
//   age: 20,
//   date: new Date(2006, 0, 10),
// };

// const wow2 = deepClone(wow);

// console.log("original : ", wow);
// console.log("cloned : ", wow2);

// ------------------------------------

// COMPLEX Test:
// const complexObj = {
//   num: 26,
//   str: "Gemini",
//   date: new Date("2026-01-26"),
//   arr: [1, [2, 3], { deep: true }],
//   map: new Map([["key", "value"]]),
//   set: new Set([1, 2, 3]),
//   // The Circular Ref
//   self: null,
// };
// complexObj.self = complexObj;

// TEST RUN
// const cloned = deepClone(complexObj);

const complexObj = {
  num: 26,
  str: "Gemini",
  date: new Date("2026-01-26"),
  map: new Map([["key", "value"]]),
  set: new Set([1, 2, 3]),
  self: null,
};
complexObj.self = complexObj;

const cloned = deepClone(complexObj);

console.log("original : ", complexObj);
console.log("cloned : ", cloned);

// console.log("--- TEST RESULTS ---");
// console.log("Not the same reference:", cloned !== complexObj);
// console.log("Date is a new object:", cloned.date !== complexObj.date);
// console.log("Date value is correct:", cloned.date.getFullYear() === 2026);
// console.log("Circular ref works:", cloned.self === cloned);
