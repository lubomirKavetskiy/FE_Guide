//Arrow function
const foo = a => a; — не потрібно писати дужок (бо один параметр) і return (бо нема {})
const foo = (a, b) => {
return a+b;
}
const newArr = arr.map(el) =>({name: el}) — верне об’єкт

стрілочні функції не мають свого this (беруть його із вищестоящого контенту);
не можна використовувати для Constructor і prototype;
у них можна передавати параметри по-дефолту;

const foo = (name=Petya)=>name;
foo(); // Petya
foo(undefined); // Petya

const foo = (name, title = name) => ${name}, ${title};
console.log(foo(Ivan)); // Ivan, Ivan


The arrow function resolves this lexically

const obj = {
  items: [2, 4],
  foo() {
    console.log(1, this === obj);
    this.items.forEach(() => console.log(2, this === obj));
  },
};

obj.foo(); //log 3 true


The arrow function resolves arguments lexically
function foo() {
	console.log(arguments); //log ['arguments for all functions']

	const arrowFunc = () => console.log(arguments); //log ['arguments for all functions']

	bar('arguments NOT for arrowFunc');
};

foo('arguments for all functions');

function foo() {
	console.log(arguments);

	const arrowFunc = (...args) => console.log(args);  //log ['arguments for arrowFunc']

	arrowFunc('arguments for arrowFunc');
};

foo('arguments for foo'); //log ['arguments for foo']