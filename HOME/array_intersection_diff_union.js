const arr1 = [1, 3, 5];
const arr2 = [2, 4, 5, 6];

const intersection = arr1.filter((el) => arr2.includes(el)); // [5]

const difference = arr1
  .filter((el) => !arr2.includes(el))
  .concat(arr2.filter((el) => !arr1.includes(el))); // [1, 3, 2, 4, 6]

const union = [...new Set([...arr1, ...arr2])]; // [1, 3, 5, 2, 4, 6]
