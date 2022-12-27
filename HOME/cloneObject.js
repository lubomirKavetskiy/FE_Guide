// Three methods how to clone object
// 1: Naive way how to copy using iteration
const iterationCopy = (src) => {
  const target = {};

  for (let key in src) {
    // if(src.hasOwnProperty(key)) {
    target[key] = src[key];
    // }
  }
  return target;
};

const src_1 = { a: 1, b: [2, 3] };
const result_1 = iterationCopy(src_1);
console.log(result_1); //=> {a: 1, b: [200, 3]};

src_1.a = 100;
console.log(result_1); //=> {a: 1, b: [200, 3]};

src_1.b[0] = 200;
console.log(result_1); //=> {a: 1, b: [200, 3]};

// opposite
result_1.b[1] = 300;
console.log(src_1.b[1]); //=> 300

// 2: Shallow copying with Object.assign
//*** nested objects are still copied as reference.
const copyObjectAssign = (src) => Object.assign({}, src);

const src_2 = { a: 1, b: [2, 3] };
const result_2 = copyObjectAssign(src_2);
console.log(result_2); //=> {a: 1, b: [200, 3]};

src_2.a = 100;
console.log(result_2); //=> {a: 1, b: [200, 3]};

src_2.b[0] = 200;
console.log(result_2); //=> {a: 1, b: [200, 3]};

// opposite
result_2.b[1] = 300;
console.log(src_2.b[1]); //=> 300

// 3: Deep copying using converting to JSON and back
//*** doesn't work for any methods inside the object
const jsonCopy = (src) => JSON.parse(JSON.stringify(src));

const src_3 = { a: 1, b: [2, 3] };
const result_3 = jsonCopy(src_3);
console.log(result_3); //=> {a: 1, b: [2, 3]};

src_3.a = 100;
console.log(result_3); //=> {a: 1, b: [2, 3]};

src_3.b[0] = 200;
console.log(result_3); //=> {a: 1, b: [2, 3]};

// opposite
result_3.b[1] = 300;
console.log(src_3.b[1]); //=> 3
