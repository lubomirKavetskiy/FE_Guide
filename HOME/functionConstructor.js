// Function-constructor
'use strict';
var Constructor = function (name) {
  var a = name;
  console.log(a);
  console.log(this);
  this.name = name;
  this.getTemp = function () {
    return 1;
  };
};

console.log(new Constructor('abc'));
// =>abc, бо a - це просто локальна перемінна, що не буде доступна в об'єктах
// {} ф-я конструктор завжди вертає об'єкт
// {name: 'abc'} для ф-ї конструктор this завжди буде об'єкт,
// який вона вертає {}.name=name

var constructor = new Constructor(`Lub`);

console.log(Object.getPrototypeOf(constructor));
// {} прототип з якого сторений об'єкт constructor

console.log(constructor instanceof Constructor);
// true первірка чи об'єкт належить класові
// або класові, який наслідується від нього

console.log(Constructor.prototype);
// {}
// prototype - це пустий об'єкт, що використ.
// для додавання свойств і методів для конструктора
// і відповідно для його об'єктів, створених через new
// Constructor.{}

Constructor.prototype.getFoo = function () {
  return this.name;
};
console.log(constructor.getFoo());
// Lub
Constructor.prototype.getDit = function (dit) {
  return dit;
};
console.log(constructor.getDit(3));
// 3

var Con = function () {};
Con.prototype = new Constructor(`Yul`);
var con = new Con();
// це *** НАСЛІДУВАННЯ ***
console.log(con.getFoo());
// Yul
// поліморфізм - здатність переоприділяти свойства і методи класів (навіть стандартни, наприклад
// створити свій власний метод toString())

// у будь-якого створеного об'єкту є свойство __proto__
// яке служить для отримання даних, що записані у prototype
console.log(constructor.__proto__ === Constructor.prototype);
// true

// **вважаємо, що Constructor == object ({})
// якщо ми звертаємось до constructor.getFoo(), то спочатку JS шукає цей метод у Constructor (Constructor.getFoo()):
// вважатимемо типу object.getFoo() // undefined (бо getFoo() записаний через проміжний пустий об'єкт prototype, як прототип: object.prototype.getFoo(),
// {
//	prototype: {
//	 getFoo: ()=> this.name
//	}
// }
// і якщо цього методу в об'єкті constructor (мається на увазі у Constructor) - не має,
// адже він є дальше в глибину, у свойстві-обєкті .prototype
// тоді JS шукає його в об'єкті __proto__ (типу constructor.__proto__.getFoo()), а
// __proto__ - це проміжний об'єкт, що дорівнює проміжному об'єкту prototype, який є свойством Constructor
// адже constructor.__proto__ === Constructor.prototype
// тоді JS продовжує шукати constructor.getFoo() так: object.__proto__.getFoo() і знаходить, бо
// object.__proto__.getFoo() == object.prototype.getFoo()
// __proto__ i prototype є одночасно і свойствами і об'єктами
//  це якби пусті об'єкти без назви куди ми записуємо свойство/метод
// і як результат воно/він стає свойством або методом об'єкта, створеного конструктором
// __proto__ - це і свойство і об'єкт і ссилка на прототип

// вся фішка використання прототипів у тому, що при свторенні 100 обє'ктів із Ф-ї-коснтруктора через new
// а потім через Constructor.prototype.method = ()=> 1 створимо метод, то
// цей method не існуватиме у цих об'єктах, але при виклику new Constructor.method() - спрацює __proto__
// яке знайде його у прототипі
// простими словами не замусурюється памєять JS

// свойство-ссилка __proto__ є у будь-якого об'єкта, воно створюється автоматично
// і є ссилкою на прототип
// використовується для отримання даних, які записані в об'єкт-прототип (наприклад через Constructor.prototype)
// JS через __proto__ звертається до прототипу
// const obj = {};
// console.log(obj.__proto__ === Object.prototype); // true
// тобто, якщо ми навіть просто створимо об'єкт через літерал {},
// то у нього теж є свойство __proto__, яке є ссилкою на Object.prototype
// а у Object.prototype - записані усі методи та свойства JS,
// тому у будь-якого створеного пустого об'єкта (чи то він створений через Конструктор чи просто через літерал)
// завжди будуть усі стандартні методи та свойства JS

// якщо у Конструкторі буде метод із іменем method і такий же метод буде у prototype,
// то метод, що у Конструкторі переб'є метод, що у прототипі, бо
// JS спочатку шукає у Конструкторі, і якщо нема - через __proto__ у prototype

// ВАЖЛИВО!!!
// constructor.__proto__.__proto__ === Object.prototype
// в об'єкта створеного через Консруктор є також усі стандртні методи JS, бо перше __proto__ - це також об'єкт,
// що  має своє прото, яке ссилається (дорвнює) на prototype Object

// свойство constructor.name - виведе ім'я Конструктора
const Constr = function (pr) {
  this.pr = pr;
};
const constr = new Constr('L');
console.log(constr.__proto__.constructor.name); // Constr
console.log(constr.__proto__.__proto__.constructor.name); // Object

const object = {}; // або const object = new Object();
console.log(object.__proto__.constructor.name); // Object

// setFunc - задати або встановити значення
// getFunc - отримати або повернути значення

//CALL, APPLY, BIND
// 1) ми беремо функцію і визиваємо її як метод об'єкта
const method = function (a, b, c) {
  return this.name + a + b + c;
};

const obj_1 = {
  name: 'L-',
  m: method,
};

const obj_2 = {
  name: 'H-',
  m: method,
};

const newFunction = method.bind(obj_1, 1, 2, 3);
// bind створить (не викличе!!!) нову функцію і пришпилить контекст виклику назавжди
// call чи apply його не змінять
console.log(newFunction()); //L-123

//** пришпилить - це типу вирішить таку траблу, як втрата контексту:
const obj = {
  a: 1,
  f() {
    console.log(this.a);
  },
};
setTimeout(obj.foo, 2000); // undefined
setTimeout(f.bind(obj), 2000);
//**

console.log(obj_1.m(1, 2, 3)); // L-123
console.log(obj_2.m(4, 5, 6)); // H-456
// в Call другим та рештам аргументів можна передати будь-що через Сomy
console.log(method.call(obj_1, 1, [2], 3)); // L-123
console.log(method.call(obj_2, 4, 5, 6)); // H-456
// в Apply другим аргументом можна передати Array
console.log(method.apply(obj_1, [1, 2, 3])); // L-123
console.log(method.apply(obj_2, [4, 5, 6])); // H-456
// тобто obj_1.m(1,2,3) == method.call(obj_1,1,2,3)
// але якщо не прописувати у obj_1.m = method,
// тоді можна якби прибити цей метод до обєкта без цього
// method.bind(obj_1)

// 2) викликати (присвоїти) метод одного об'єкта на іншому об'єкті (іншому)
const obj_3 = {
  name: 'K-',
  meth: function () {
    return this.name;
  },
};

console.log(obj_3.meth()); // K-

const obj_4 = {
  name: 'P-',
};

console.log(obj_3.meth.call(obj_4)); // P-



const object = {};
object.__proto__ === Object.prototype; //=> true

const object = new Object;
object.__proto__ === Object.prototype; //=> true

const object = Object.create(null);
object.__proto__ === Object.prototype; //=> false

const number = 199;
number.__proto__ === Number.prototype; //=> true
number.__proto__.__proto__ === Object.prototype; //=> true (перше .__proto__ константи number є обєктом, який теж має своє __proto__, що вказує на Object.prototype, тому Number.prototype є наслідником Object.prototype)
const string = «traatatfff»;
string.__proto__ === String.prototype; //=> true
string.__proto__.__proto__ === Object.prototype; //=> true