Hoisting (підняття)
на фазі оголошення оголоcили перемінну та ініцілізували її зі значенням undefined
на фазі виконання у змінної ще не було присвоєно значення, лише undefined
console.log(myVar) // undefiend
var myVar = 2;
console.log(myVar) // 2

на фазі оголошення оголоcили перемінну та встановили їй режим TDZ
на фазі виконання у змінної ще не було значення, лише undefined
console.log(myVar) // ReferenceError: Cannot access ‘myVar’ before initialization
let myVar = 2;

Фази скрипта:

Creation Phase
Execution Phase
Під час 1 фази відбувається оголошення перемінної (функції). Оголошені перемінні умовно піднімаються вверх, на початок коду (їм виділяється простір у пам’яті) (хоча насправді оголошення потрапляє у пам’ять під час компіляції браузера і фізично залишаються на місці оголошення). Якщо перемінна оголощена через var, то їй на цій же фазі автоматично присвоюється значення ‘undefined’, а якщо через let чи const , то на цій фазі вони теж піднімаються (їм виділяється простір в пам’яті), але ініціалізатор встановлює змінні за допомогою спеціального режиму під назвою TDZ (Temporal Dead Zone). Це означає, що змінні існують, але ви не можете отримати до них доступ, поки не присвоїте якесь значення.

Дещо по іншому ведуть себе перемінні, оголошені через let та const (див. //3 і //6), а також  function Declaration (див. //7).

При оголошенні function Declaration заисується не лише назва (перемінна) функції, а й тіло ф-ії.

https://developer.mozilla.org/ru/docs/Glossary/Hoisting

//example with Function Scope
var myVar = 1;
function someScopeFunc() {
   var myVar = 10;
   console.log(myVar) // log 10
}
someScopeFunc()
console.log(myVar) // log 1

//example with Block scope
//var
var myVar = 2;
if(true) {
  var myVar = 10;
}
console.log(myVar); // 10
//let
let someVar = 2;
if(true) {
  let someVar = 10;
}
console.log(someVar); // 2

let me = 'go'; // not globally scoped
var you = 'able'; // globally scoped
console.log(window.me); // undefined
console.log(window.you); // 'able'


		//1) TDZ
		console.log(a); // Uncaught ReferenceError: a is not defined
		let a = 1;
		let b;
		console.log(b); // undefined
		// 2) перемінні доступні лише у межах блоку {}
		if(true) {let c=1;}
		console.log(c); // Uncaught ReferenceError: c is not defined
		///////////////////////////
		const foo = (t)=>{
		  let d;
			if(t) {
		      d=1;
		    }
			else {
		      d=2
		    }
		  return d;
		}

		console.log(foo(1)); // 1
		console.log(d); // Uncaught ReferenceError: d is not defined
        //////////////////////////
		let left  = 'лівий';
		let right = 'правий';

		{
			let temp = left;
			left     = right;
			right    = temp;
		}

		console.log(temp); // Uncaught ReferenceError: temp is not defined - бо let у '{}' - це область видимості
		console.log(left); // 'правий'
		console.log(right); // 'лівий'
		////////////////////////////////
                A)
                  const foo = () => {
	          let a = 1;

                 {
                   let a;
	           a = 2;

                   console.log(a); // 2
                 };

	         console.log(a); // 1
                 };

                 foo(); // 2   1

                 B)
                 const foo = () => {
	          let a = 1;

                 {
	           a = 2;

                   console.log(a); // 2
                 };

	         console.log(a); // 2
                 };

                 foo(); // 2   2
////////////////////////////////////
var a = 1;
const foo = () => {
console.log(a);
var a = 100;
};

foo();  //undefined


let a = 1;
const foo = () => {
console.log(a);
let a = 100;
};

foo();   //Uncaught ReferenceError: Cannot access 'a' before initialization
//////////////////////////////////////////
		const g; // errror
		const j = 1;
		j = 2; // errror

let x = 1;
function foo() {
    console.log(x);
}
foo();  // 1

function foo() {
    x=2;
    console.log(x);
}
foo();  // 2
x;  // 2

function foo() {
    let x=5;
    console.log(x);
}
foo();  // 5
x;  // 2

function foo() {
    let x=5;
    console.log(x);
    x=10;
}
foo();  // 5
x;  // 2