let a = 0;
console.log(++a); // 1
console.log(a); // 1

let b = 0;
console.log(b++); // 0
console.log(b); // 1

let c = 1,
  d = c++;
console.log(c, d); // 2, 1

let e = 1,
  f = ++e;
console.log(e, f); // 2, 2

let g = 0;
console.log((g += 1)); // 1
