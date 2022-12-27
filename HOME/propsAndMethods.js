const a = abcde;

PROPS
console.log(a.length); // 5
console.log(a[2]); // c

METHODS
console.log(a.slice(1, 4)); //bcd (з 1 до 4)
console.log(a.toUpperCase()); // ABCDE
console.log(a.toLowerCase()); // abcde
console.log(a.indexOf(c)); // 2
console.log(a.includes(c)); // true
console.log(a.concat(_2)); //  abcde_2
console.log(a.slice(1, 3)); // bc
console.log(a.split().reverse().join());// dcba
console.log(a.repeat(2));// dcbadcba
console.log(dcba.startsWith(d));// true

+ for array
const array = [1];
array.push(2);
console.log(array); // [1,2]
array.pop();
console.log(array); // [1]
array.unshift(0);
console.log(array); // [0,1]
array.shift();
console.log(array); // [1]

const arr=[1,2,3];
console.log(arr.reverse()); //[3,2,1]

верне перший елемент, який задовільняє умову
console.log(arr.find(elem=>elem < 3)); // 2

console.log(arr.slice(-2,2)); //[2]

*change current array
console.log(a.splice(0)); //[1,2,3]
console.log(a); //[]
console.log(a.splice(1,2)); //[2,3] (з 1 2шт)
console.log(a); //[1]
console.log(a.splice(2,1,5)); //[3] (замінене значення)
console.log(a); //[1,2,5]

const  arr = [5,9];
for(let i=0; i<arr.length; i++) console.log(arr[i]); //5, 9
arr.forEach((a)=>console.log(a)); //5, 9
////
console.log(arr.forEach()); // undefined
////
const arr = [5,9];
arr.forEach((elem, index, array)=>array[index]=elem*2);
console.log(arr); // [10,18]
////
console.log(Object.keys(arr)); //[«0″,»1»]
console.log(Object.values(arr)); //[5,9]
for(const keys in arr) console.log(keys); // 0   1
for(const value of arr) console.log(value); // 5   9

console.log(0 in arr); // true

може з псевдомасиву(колекції) зробити масив
console.log(Array.from(‘foo’)); // [«f», «o», «o»]
console.log(Array.from([1, 2, 3], x => x + x)); // [2, 4, 6]

const arr=[1,2,3],
console.log(arr.reduce((a,b)=>a+b, 0)); //1+2+3
const ar=[[1,2],[3,4]],
console.log(ar.reduce((a,b)=>a.concat(b))); //[1,2,3,4]

console.log([1,2,3].includes(2));// true

const arr = [-2,0,1];
// для true достатньо щоб хоча б один елемент вернув у колбеці true (схоже до роботи оператора ||)
console.log(arr.some((i)=>i>0)); // true
// для true потрібно, що всі елементи вернули у колбеці true (схоже до роботи оператора &&)
console.log(arr.every((i)=>i>0)); // false
*return new array
const array=[{a:1, b:2}, {a:3, b:4}];
console.log(newArray=array.map((arr)=>arr.a)); // [1,3]
console.log(newArray=array.filter((arr)=>arr.b>2)); //[{a:3, b:4}]

*change current array
const array=[{str:z, num: 3}, {str:abc, num: 2}, {str:cba, num: 1}];
console.log(array.sort((a,b)=>a.num-b.num)); //[ {str:cba, num: 1}, {str:abc, num: 2}, {str:z, num: 3}];
console.log(array.sort((a,b)=>{
if(a.str>b.str) return 1;
if(a.str<b.str) return 1;
return 0;
})); //[ {str:abc, num: 2}, {str:cba, num: 1},  {str:z, num: 3}];

*sort — деструктивний метод, тобто він змінює початкойи масив, тому для того аби не змінювати початковий стан масиву =>  використовуй array.slice(0).sort()
у такому випадку метод sort буде деструктирузувати не сам масив, а його копію

+for object
const  obj = {a:1, b:2};
console.log(Object.keys(obj)); //[«a»,»b»]
console.log(Object.values(obj)); //[1,2]
for(const keys in obj) console.log(keys); // a   b
for(const value of obj) — not exist
BUT YOU CAN DO IT LIKE THIS:
Object.values(obj).forEach()    ||     Object.values(obj).map();

console.log(«a» in obj); // true

const obj = {a:1};
copyObj = Object.assign({}, obj);
console.log(copyObj); // {«a»:1}

const obj1={a:1},
obj2={b:2},
obj3={c:3},
mergeObj=Object.assign(obj1, obj2, obj3);
console.log(mergeObj); // {«a»:1, «b»:2, «c»:3}

console.log([1,2,3].toString()); // 1,2,3

console.log(Math.floor(Math.random()*4)) // 0 — 1 — 2 — 3