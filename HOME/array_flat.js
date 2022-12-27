Array.prototype.flat;
const arr = [1, [2], [3, [4]]];
const res = arr.flat();
console.log(res_1); //[1, 2, 3, [4]]
arr; //[1, [2], [3, [4]]]

const res_infinity = arr.flat(Infinity);
console.log(res_infinity); //[1, 2, 3, 4]
arr; //[1, [2], [3, [4]]]
