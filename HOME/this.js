// //1 вище document нічого не має
// console.log(this.document === document); // true

// //2 вище window нічого не має (при будь-якому режимі)
// console.log(this.window === window); // true
// //3 this у window вказує на window
console.log(this === window); // true
console.log(window === this); // true

// //this з'являється лише у момент виклику функції (його не має при оголошенні самої ф-ції) і вказує на контекст її виклику, тобто на об'єкт у якому вона викликається (простими словами це те, що стоїть зліва від '.')
// //4 якщо не використовувати строгий режим, тоді 'а' викликається в об'єкті Window, це те саме, що window.a();
const a = function () {
  console.log(this);
};
a(); // Window //if 'use strict' => undefined

// //як відомо arrow function не мають свого this, при їх виклику this буде вказувати на this із об'єкта в якому вона викликається (на один порядок вище)
// //5 стрілочна функція, що return у момент свого виклику не матиме свого this, тому вона виведе this функції 'b', для якої this - це window, бо вона там викликається - b()()
const b = function () {
  return () => console.log(this);
};
// //5-a
// b()(); // Window //if 'use strict' => undefined
// //або:
const c = b();
c(); // Window//if 'use strict' => undefined, бо дивись на те, що здіва від с
// //або:
(function () {
  console.log(this);
})(); // Window //if 'use strict' => undefined
// //5-b
(function () {
  console.log('1', this);
  return function () {
    console.log(this);
  };
})()(); // 1 Window Window бо для 2-ї ф-ї, та що return - у неї this береться через замикання із першої, для якої this - це Window
//if 'use strict' => 1 undefined undefined (аналогічно замикання відбувається на this)

//================================//
// ще про замикання на this:
function foo() {
  console.log(this === window); // true
  const obj = {
    m: () => this,
  };
  console.log(obj.m()); // Window , спрацьовує замикання
}
foo();

('use strict');
function foo() {
  console.log(this === undefined); // true
  const obj = {
    m: () => this,
  };
  console.log(obj.m()); // undefined , спрацьовує замикання
}
foo();

//тобто якщо викликається ф-я, яка повернтається у ф-ї або викликається метод об'єкта (записаний, як стрілочна ф-я) у звичайні ф-ї - працює змикання на this
// а якщо просто викликається:
// звичайна ф-я для неї this - Window (у строгому режимі undefined)
// стрілочна ф-я - завжди Window
//================================//

// !!! //6 проте, якщо стрілочна функція викликаєть безпосередньо у window, вона теж повертатиме як this - window, бо див. //2
const foo = () => console.log(this);
foo(); // Window у будь-якому режимі
// //6-a або викликається у стрілочній ф-ї
const f = () => () => console.log(this);
f()(); //Window у будь-якому режимі

// //7 аналогічно як і //6
(() => console.log(this))(); // Window у будь-якому режимі
// //7-a
(
  () => () =>
    console.log(this)
)()(); // Window у будь-якому режимі

// //8
function f() {
  return this;
}
console.log(f()); // Window //if 'use strict' => undefined

// //REMEMBER!!!
// // якщо працюємо не у 'use strict' чи то перемінна, чи то функція (навіть стрілочна)-- вони завжди у Window, зліва від них Window
// // якщо використовуємо 'use strict' все окрім того, що прописано через function (бо воно буде undefined), теж буде у Window.
// // іншимим словами дивлюсь чи є слово function, якщо воно є, тоді дивлюсь на режим, якщо строгий - undefined, якщо не строгий - Window
// // тобто, якщо стрілочна ф-ція повертається у звичайній ф-ї, тоді спрацює замикання, тобто треба знайти this для цієї звичайної ф-ї, а для цього треба дивитись де викликається ця звичайна і на режим
// // а якщо стрілочна у стрілочній, то для неї this у будь-якому режимі - Window

// // якщо у нас у ф-ї повертається функція в якій виводиться this (не важливо чи то звичайна ф-я, чи стрілочна) (5-a, 5-b, 6-a)
() => () => console.log(this); // (7-a)- то знаємо, що другої функції this не має, а у першої хоч вона викликана у Windows - теж ніби не має, але так як для стрілочних вище Windows нічого нема - тому this === Window

('use strict');
const obj = {
  m: function () {
    console.log(this);
  },
};
obj.m(); // console.js: {m: ƒ}
const f = obj.m;
f(); // console.js: undefined

//this може також бути і в об'єкті
const obj_1 = {
  msg: `Hi obj_1`,
  showMsg: function () {
    console.log(this.msg);
  },
};

obj_1.showMsg(); // Hi obj_1

const obj_2 = {
  msg: `Hi obj_2`,
};

obj_2.foo = obj_1.showMsg;
obj_2.foo(); // Hi obj_2
// !!! // якщо у obj_1 замість showMsg використати стрілочну ф-ю, результат буде // undefined
// бо для неї this буде Window, а у Window нема перемінної msg

const foo = () => {
  console.log(this);
};
foo(); // Window у будь-якому режимі
const a = 1;
const obj = {
  a,
  m() {
    return () => console.log(this);
  },
};
obj.m()(); // {a: 1, m: ƒ}

const obj = {
  a: 1,
  m() {
    return () => console.log(this.a);
  },
};
obj.m()(); // 1

//this може також бути і в об'єкті
const obj_3 = {
  showMsg: function () {
    return { showMsg: () => console.log(this) };
  },
};

obj_3.showMsg().showMsg(); // obj_3

const obj_4 = {
  showMsg: () => ({ showMsg: () => console.log(this) }),
};

obj_4.showMsg().showMsg(); // Window при будь-якому режимі

//this також може бути і у ф-ї-конструкторі, і вказує на свойство об'єкта, що буде з цього класу
var User = function (name) {
  this.name = name;
  this.getName = function () {
    console.log(this.name);
  };
  var foo = function () {
    console.log(1);
  }; // приватна ф-я
};

var user = new User(`Ivan`);
user.getName(); // Ivan

// this також може бути як event.target при кліку на елемент
var h = document.querySelector('h1');
h.addEventListener('click', function (e) {
  console.log(e.target === this);
}); //true
// <h1 style="font-size: 20px">Hello</h1>

// !!! // але у коснтрукторі навіть стрілочна ф-я вказує на об'кт
class C {
  constructor(name) {
    this.name = name;
    this.m = () => this;
  }
}

const c = new C(`H`);

console.log(c.m()); // C {name: "H", m: ƒ}
