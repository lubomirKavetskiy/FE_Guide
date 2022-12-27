const fromArrayToObj = (data) => data.reduce((acc, { id, ...rest }) => ({ ...acc, [id]: rest }), {});
const fromObjToArray = (oldData, newData) => Object.entries({ ...oldData, ...newData }).map(([id, rest]) => ({ id, ...rest }));


const data = [
 {id:1, name: 'a', parentId: null},
 {id: 2, name: 'b', parentId: 1},
 {id: 3, name: 'c', parentId: 2},
 {id: 4, name: 'd', parentId: 1},
 {id: 5, name: 'e', parentId: null}
];

const foo = (data, id) =>
 data.filter(el=>el.parentId === id)
.map(item=>({...item, children: foo(data, item.id)}));

const bar = (data, id = null) =>
  data.reduce((acc, el) => {
    if(el.parentId === id) {
      acc.push({...el, children: bar(data, el.id)})
    }
    return acc
  },
[]);

const arr = [5, 1, 6, 7];
const minVal = arr.reduce ((min, curr) => (curr < min ? curr : min));
console.log (minVal); //1


const arr_2 = [5, 1, 6, 7];
const maxVal = arr_2.reduce ((max, curr) => (curr > max ? curr : max));
console.log (maxVal); //7



const books = [
  {id: 10, title: 'Book_A', authorId: 101},
  {id: 20, title: 'Book_B', authorId: 201},
  {id: 30, title: 'Book_C', authorId: 301},
  {id: 40, title: 'Book_D', authorId: 201},
  {id: 50, title: 'Book_E', authorId: 201},
  {id: 60, title: 'Book_F', authorId: 301},
];

const authors = [
  {id: 101, author: 'Author_A'},
  {id: 201, author: 'Author_B'},
  {id: 301, author: 'Author_C'},
];

const res = new Map (
  authors.map (({id}) => [id, books.filter (({authorId}) => authorId === id)])
);

console.log(res); // Map(3) {101 => Array(1), 201 => Array(3), 301 => Array(2)}
[[Entries]]
0: {101 => Array(1)}
key: 101
value: Array(1)
0: {id: 10, title: "Book_A", authorId: 101}

1: {201 => Array(3)}
key: 201
value: Array(3)
0: {id: 20, title: "Book_B", authorId: 201}
1: {id: 40, title: "Book_D", authorId: 201}
2: {id: 50, title: "Book_E", authorId: 201}

2: {301 => Array(2)}
key: 301
value: Array(2)
0: {id: 30, title: "Book_C", authorId: 301}
1: {id: 60, title: "Book_F", authorId: 301}


console.log (res.get (301));
// [{id: 30, title: 'Book_C', authorId: 301},  {id: 60, title: 'Book_F', authorId: 301}]

const array = [1, 2, [3, 4], [[5], 6], 7];

const foo = arr => arr.reduce((acc, el) => (
  !Array.isArray(el) ? acc.concat(el) : acc.concat(foo(el));
), []);

console.log(foo(array)); //[1,2,3,4,5,6,7];

const foo_2 = arr => arr.reduce((acc, el) => (
  !Array.isArray(el) ? [...acc, el] : [...acc, ...(foo(el))];
), []);
console.log(foo(array)); //[1,2,3,4,5,6,7];
Array.prototype.reduce()
const obj = {a: 1, b: 2};
const res = Object.keys(obj).reduce((acc, k)=>({...acc, [k]:obj[k]*obj[k]}), {});
const res = Object.assign({}, ...Object.keys(obj).map(k => ({[k]: obj[k]*obj[k]})));
const res = Object.assign({}, ...Object.entries(obj).map(([k, v]) => ({[k]: v*v})));
1
2
3
4
5
Array.prototype.reduce()
const obj = {a: 1, b: 2};
const res = Object.keys(obj).reduce((acc, k)=>({...acc, [k]:obj[k]*obj[k]}), {});
const res = Object.assign({}, ...Object.keys(obj).map(k => ({[k]: obj[k]*obj[k]})));
const res = Object.assign({}, ...Object.entries(obj).map(([k, v]) => ({[k]: v*v})));
a)
1) export default () => (<p>smt</p>);
   import AnyTitle from ...
2) export default class App extends Component {...
   import AnyTitle from ...

b)
1) export const App = () => (<p>smt</p>);
   import { App } from ...
   import { App as AnyTitle} from ...
c)
1) export firstFunc() {};
   export secondFunc() {};
   // can't be export default if in one file is more than 1 func or 1 const
   import * as AnyTitle from ...

a)

const obj = {
	a: 1,
	b: 2,
	c: {
		d: 3,
		e: [4, 5, 6, 7, 8],
		f: {
			g: 9,
		}
	}
};

const res = Object.assign(
  {},
	obj,
  {b: 200},
  {c: Object.assign(
    {},
    obj.c,
    {e: Object.assign(
      [],
      obj.c.e,
      {2: 60})
    },
    {f: Object.assign(
      {},
      obj.c.f,
      {g: 90})
    })
  }
);


const arr = [1,2,3];
const copy_1 = [...arr];
const copy_2 = arr.concat();
const copy_3 = arr.slice();

const obj = {};
console.log(Object.keys(obj).length); //=> 0

const obj = {
	player: {
		leftPlayer: {
			play: false,
		},
		rightPlayer: {
			play: false,
		}
	}
}

const newObj = Object.assign({}, {player: Object.assign({}, obj.player, {leftPlayer: Object.assign({}, obj.player.leftPlayer, {play: true})})});

obj.player.leftPlayer.addProp = 10;
obj.player.leftPlayer.leftPlayer = 100;
obj;
newObj;

//тут obj взагалі не треба юзати, бо в обджект є тільки одне свойство (players), але якщо би в ньому були ше якісь проперті, я кі б нам були потрібні в новому обджекті, тоді треба прописувати
const newObj = Object.assign({}, obj {player: Object.assign({}, obj.player, {leftPlayer: Object.assign({}, obj.player.leftPlayer, {play: true})})});

//юзати дорівнює або двокрапку в обджект ассайн не можна => Object.assign({}, obj.player = або : )
//так як і не можна в об'єкті => {obj.player: }
// так теж не можна {obj.player: }



const obj = {
	a:1,
	b:2,
	c: {
		d:3,
		e:4,
	},
};

const obj_2 = Object.assign(
    {}, obj, {b: 200}, {c: Object.assign(
				{}, obj.c, {d: 100}
			  )}
);

obj.a = 100;
obj.c.d = 200;
console.log(obj);
console.log(obj_2);

// Closures
const foo = (start=1) => {
  let num = start;

  return () => ++num;
};

const foo_1 = foo(10);
foo_1(); //=> 11
foo_1(); //=> 12

const foo_2 = foo();
foo_2(); //=>2

// ВИВЕСТИ ЧИСЛО, ЩО БУДЕ ЗМІНЮВАТИСЬ КОЖНОЇ СЕКУНДИ
let num = 1;
const foo = () => {
console.log(num);
num++;
};
setInterval(‘foo(num)’, 2000);

//або
for(let i=1; i<=10; i++){
setTimeout(()=>console.log(i), i*1000);
}

// ВИВСЕТИ ЧИСЛО НА ЕКРАН ЧЕРЕЗ 2 СЕКУНДИ
				setTimeout(()=>console.log(1), 2000);

// ЗАМИКАННЯ
		const greet = (word) => (name) => `${word}, ${name} ...!`
		greet(`Hellow`)(`Pety`);  // "Hellow, Pety ...!"

// РЕКУРСІЯ - ФАКТОРІАЛ
		const factorial = (numb) => numb == 1 ? 1 : numb * (factorial(numb - 1));
		console.log(factorial(3)); // 3 * 2 * 1  === 6

// ЧИСЛО ДО СТЕПЕНЯ
		const upNumbToPower = (numb, power) => {
			let result = 1;
			for(let i=1; i<=power; i++){
				result *= numb;
			};
			return result;
		};

		// або
		const upNumbToPower = (numb, power) => {
			let result = numb;
			for(let i=1; i<power; i++){
				result *= num;
			};
			return result;
		};

		//або
		console.log(Math.pow(2,3)); // 8

		//або
		const upNumbToPower = (numb, power) => power == 1 ? numb : numb * upNumbToPower(numb, power - 1);
		// upNumbToPower(2, 3); 2 * 2 * 2 * 1 == 8


// ЧИСЛО ФОБІНАЧІ
		const findNumbOfFeebonuches = (maxNumb) => {
			let result = [0,1];
			for(let i=1; i<maxNumb-1; i++){
				result.push(result[result.length-1] + result[result.length-2]);
			};
			return result;
		}
		findNumbOfFeebonuches(10); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]


// є таблиця з ячейками
// при натисканні на ячейку таблиці вона стає червоною,
// якщо до неї був вже кліки на якусь ячейку - вона втрачає колір

let flag;

const changeBg = e => {
  if(flag !== undefined) flag.style.background = '';
  flag = e.target;
  flag.style.background = 'red';
}

document.querySelector('table').addEventListener('click', changeBg);


const response = [
  { parentId: 1, childrenId: 1 },
  { parentId: 2, childrenId: 2 },
  { parentId: 1, childrenId: 2 }
];
const reducedResponce = response.reduce((acc, item) => {
  return {
    ...acc,
    [item.parentId]: { ...acc[item.parentId], [item.childrenId]: true }
  };
}, {});
//
{
  1: {1: true, 2: true},
  2: {2: true}
}

var randArray = [‘apple’, [‘apple’, 5, ‘cherry’, [7, ‘apple’, ‘apple’, [‘q’, 3, 5],’apple’]], ‘orange’, 9, ‘onion’, ‘apple’, ‘apple’];
//let count=0;

/*const foo=(arr)=> {
for(let i=0; i<arr.length; i++) {
if (Array.isArray(arr[i])) {
foo(arr[i]);
} else if (typeof arr[i] === number){
count+=1;
}
}
};
*/

const foo = (arr)=>{
let count=0;
for(const value of arr) {
if(Array.isArray(value)){
count += foo(value);
} else if(value === apple){
count++;
}
}
console.log(1);
return count;
}

console.log(foo(randArray));

const foo = (data) => {
	console.log(data.replace(/\s+/g,' ').split('; ').sort().join('; ').replace(/\; /g, ';\n'));
}

foo(`box-sizing: initial;
  display: inline-block;
  outline: 0;
  width: 8em;
  height: 4em;
  position: relative;
  cursor: pointer;`);


const arr1 = ["E","R"];
	const arr2 = ["A","B","C"];
	const arr3 = ["B", "A", "E"];

	const allConcated = arr1.concat(arr2,arr3);

	return Array.from(new Set(allConcatedArr));


