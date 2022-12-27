//Прототип та ссилка __proto__
//** прототип - база
// У JS існує вбудоване наслідування між ОБЄКТАМИ за допомогою __proto__.
// прототип (не Prototype !!!)- це обєкт, на який вказує ссилка __proto__
const obj_1 = { a: 1 };
const obj_2 = { b: 2 };
// obj_1 буде прототипом для obj_2
// __proto__ - це ссилка, яка вказує на прототип
obj_2.__proto__ = obj_1;
// або з початку писати так: const obj_2 = {b: 2, __proto__: obj_1}
console.log(obj_2); //=> {b: 2}
// при читанні властивості із обєкта, якщо його там нема, воно буде шукатись в __proto__
console.log(obj_2.a); //=> 1
obj_1.a = 100;
console.log(obj_2.a); //=> 100
// щоб перевірити чи належить властивість самому обєкту слід використовувати hasOwnProperty():
console.log(obj_2.hasOwnProperty('a')); //=> false

// метод getPrototypeOf повертає прототип
console.log(Object.getPrototypeOf(obj_2)); //=> {a: 100}

// іншими словами повертає об'єкт, на який вказує ссилка __proto__, бо:
console.log(obj_2.__proto__); //=> {a: 100}

// одному обєкту присвоїти відразу декілька прототипів неможливо,
// але можна побудувати ланцюжок прототипів
const obj_0 = { c: 0 };
obj_1.__proto__ = obj_0;
console.log(obj_2.c); //=> 0
console.log(obj_2.__proto__.__proto__); //=> {c: 0}

// FunctionConstruction.prototype
//** властивість prototype можуть мати лише Ф-ї-Конструктори
//** prototype водночас є також обєктом, який як і всі має своє .__proto__, що завжди вказує на
// якщо ми хочемо для створених обєктів із ф-ї-конструктор (але не з классу ES6) додати прототип
// ми використовуємо властивість ф-ї-конструктор - .prototype
function Constr(n) {
  this.name = n;
  this.meth = function () {
    return this;
  };
}

const prototyWithPropertyAndMethods = {
  a: 1,
  method: function () {
    return this;
  },
};
Constr.prototype = prototyWithPropertyAndMethods;
const constr = new Constr('rnd');
console.log(Object.getPrototypeOf(constr)); //=> {a: 1, method: ƒ}
// для ф-ї-конструктор this - це обєкт, що вона вертає із властивостями та методами, які ми йому присвоюємо
console.log(constr.meth()); //=> {name: "rnd", meth: ƒ}
console.log(constr.method()); //=> {name: "rnd", meth: ƒ}
console.log(constr.a); //=> 1
// тобто у __proto__ обєкту, створеного через new Constructor записується все,
// що є у вдастивості .prototype конструтора
console.log(constr.__proto__ == Constr.prototype); //=> true

//також через властивість prototype можна додати і так прототип:
Constr.prototype.newProp = 100;
console.log(constr.newProp); //=> 100
Constr.prototype.newMethod = () => 500;
console.log(constr.newMethod()); //=> 500
//
console.log(Object.getPrototypeOf(constr)); //=> {a: 1, method: ƒ, newProp: 100, newMethod: ƒ}
console.log(constr.__proto__); //=> {a: 1, method: ƒ, newProp: 100, newMethod: ƒ}
console.log(constr.__proto__ == Constr.prototype); //=> true
console.log(constr.__proto__ == Object.getPrototypeOf(constr)); //=> true
console.log(Constr.prototype == Object.getPrototypeOf(constr)); //=> true

// поточні ВИСНОВКИ:
// 1) не варто плутати прототип із ф-ю-конструктором чи классом (ES6)
// 2) прототип це обєкт (з властивістю або методами), за допомогою якого ми додаємо до обєкту(створеного як {...}) або обєктів
// (створених через new Constructor) нові властивості чи методи
// 3) прототип який ми додаємо до обєкту зберігається у властивості-обєкті .__proto__ цього обєкту
// 4) ми додаємо до обєкта прототип через:
// А) .__proto__ (якщо цей обєкт не створений через new Constructor)
// типу так:
const obj = { a: 1, __proto__: { b: 2 } };
// або так:
const objPrototyp = { b: 2 };
obj = { a: 1, __proto__: objPrototyp };
// тут __proto__ - 1) це ссилка на прототип для обєкту,
//                 2) це властивість для ОБЄКТУ для якого запишеться прототип і водночас це обєкт куди запишеться прототип
// В) .prototype (якщо обєкти створені через new Constructor)
// типу так:
function Constructor(a) {
  this.a = a;
  this.metod = () => this.a;
}

Constructor.prototype.newProp = 10;
Constructor.prototype.newMethod = () => 50;
// або так:
const objectPrototyp = { b: 2 };
Constructor.prototype.newObjPrototyp = objPrototyp;
// і тільки після цього створюємо обєкт
const constructor = new Constructor(5);
// тут .prototype - 1) це ссилка на прототип для всіх обєктів, створених черeз цю ф-ю-конструктор,
//                  2) це властивіст Ф-Ї-КОНСТРУКТОР і водночас обєкт куди запишеться прототип для всіх обєктів, створени черз цю ф-ю-конструктор,
// С) Object.setPrototypeof(obj, proto)
// типу так:
const obj = { a: 1 };
const proto = { b: 2 };
Object.setPrototype(obj, proto);
obj.b; //=> 2
// 5) для перевірки належності властивості/методу обєкту (не його прототипу) використовують метод .hasOwnProperty()
console.log(constructor.hasOwnProperty('newProp')); //=> false
// 6) ці 3 вирази вертають один і той же результат і є рівними між собою:
(constructor.__proto__ == Constructor.prototype) ==
  Object.getPrototypeOf(constructor);

// щоб перевірити чи належть обєкт Конструктуру можна за допогою методу .instanceOf() :
console.log(constructor instanceof Constructor); //=> true

// також можна дізнатись імя Конструтора за допомогою .__proto__.constructor.name :
console.log(constructor.__proto__.constructor.name); //=> Constructor
// перше .__proto__ обєкта constructor є водночас і властивістю і обєктом, тому як будь-який обєкт теж має своє __proto__,
// що завжди вказує (дорівнює) Object.prototype, де в .prototype записані всі властивості та методи
// стандартного обєкту, тому і створені через конструктор обєкти мають всі властивості та методи стандартного обєкту
console.log(constructor.__proto__.__proto__ == Object.prototype); //=> true
// .prototype - це ж також обєкт, який має своє __proto__ що також завжди вказує (дорівнює) Object.prototype
console.log(Constructor.prototype.__proto__ == Object.prototype); //=> true
console.log(constructor.__proto__.__proto__.__proto__); //=> null
// бо, constructor.__proto__.__proto__.__proto__ === Object.prototype.__proto__
// а Object.prototype.__proto__ === null, так як Object.prototype - це вершина ієрархії
// тому і говорять, що в JS всі обєкти наслідуються від Object.prototype
console.log(constructor.__proto__.__proto__.constructor.name); //=> Object
// бо (constructor.__proto__.__proto__.constructor.name) === (Object.prototype.constructor.name) //=> Object
// існує така ієрархія
Object.prototype
    Array/Number/String.prototype.__proto__
    [1, 2, 3]/100/'abc'.__proto__.__proto__

    для прикладу:
    [1, 2, 3].__proto__.__proto__ == Array.prototype.__proto__ == Object.prototype

    const object = new Object();
    const literal = {};
    object.__proto__ == literal.__proto__ == Object.prototype;

    //** виходить, що в JS створили Ф-юКонструктор function Object() {};
    // і в Object.prototype = записали всі стандартні властивості та методи
    // і при пошуку властивості чи методу все (через .__proto__ яке є водночас і властивістю і обєктом, і має також своє .__proto__ яке =>) доходить до Object.prototype

    // у кожної ф-ї (крім стрілочної) по-замовчуванню є властивість .prototype з єдиною властивістю constructor:
    const foo = function(){return 1};
    console.log(foo.prototype); //=>{constructor: ƒ}

    // ми можемо перезаписувати стандартні методи
    const ar = [1, 2];
    Array.prototype.reverse = function() {return 1};
    console.log(ar.reverse()); //=> 1



// inherience classe (not ES6)
// 1. Контсруктор Animal
function Animal(n) {
  this.name = n;
  this.speed = 0;
  this.methodFromConstructor = function () {
    return this.name;
  };
}
// 1.1 Метод в прототип
Animal.prototype.run = function (sp) {
  return (this.speed += sp);
};
// 1.2 Властивість в протип
Animal.prototype.newProp = 500;

// 2. Контсруктор Dog
function Dog(n) {
  this.name = n;
}
// присвоєння відразу після оголошення классу, бо інакше перезатреться все що буде присвоєно (2.1) в .prtotype
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// 2.1 Метод в прототип
Dog.prototype.jump = function (sp) {
  return this.speed + sp;
};

// так наслідується лише те, що буде записане в Animal.prototype
console.log(new Dog('abc').newProp); //=> 500
// тобто доступу до властивостей Animal у Dog не буде
console.log(new Dog('abc').speed); //=> undefined
// щоб отримати конструктор (все, що записане у классі, а не додано через .prototype)
// потрібно викликати класс зі всіма аргументами в контексті поточного обєкту
function Dog(n) {
  Animal.apply(this, arguments);
}
// тепер в Dog будуть доступні властивості із конструктору Animal
console.log(new Dog('abc').speed); //=> 0
console.log(new Dog('abc').jump(300)); //=> 300

// викликати метод батька у методі потомку можна так:
Dog.prototype.foo = function () {
  // якщо метод батька був записаний через .prototype.run = function....
  Animal.prototype.run.apply(this);
  // або так, якщо метод батька був записаний у конструкторі:
  this.methodFromConstructor();
};

const dog = new Dog('dog');
console.log(dog.foo(111));

// щоб перевірити чи належить обєкт даному классу використовують метод instanceof:
console.log(dog instanceof Dog); //=> true
// метод вертає результат із врахуванням наслідуваності __proto__
console.log(dog instanceof Animal); //=> true
console.log(dog instanceof Object); //=> true

// МЕТОДИ:
// instanceof => перевіряє з урахуванням прототипного наслідування чи належить обєкт пеном классу
// hasOwnProperty => перевіряє без урахування прототипного наслідування чи належить дана властивість/метод обєкту
// getPrototypeOf => повертає прототип обєкта (const obj = {}; Object.getPrototype(obj) === obj.__proto__ === Object.prototype)
// Object.setPrototypeOf(obj, proto) => встановлює proto для obj (const target = {a: 1}; const proto = {b: 2}; Object.setPrototypeOf(target, proto); target.b //=> 2);
// Object.getOwnPropertyNames(obj) => повертає массив властивостей обєкту (Object.getOwnPropertyNames(target); //=> [a])
// proto.isPrototypeOf(obj) => повертає true/false (proto.isPrototypeOf(target); //true)
// Object.create(proto) => створення пустого обєкту з прототипу


function Room(name) {
  this.name = name;
  this.ares = 12;
  }

  Room.prototype.setArea = function(area) {
  this.area = area;
  };

  Room.prototype.showArea = function() {
  console.log(this.area);
  };

  Room.prototype.showName = function() {
  console.log(this.name);
  };

  let room = new Room(«base»);
  room.setArea(«50»);
  room.showArea(); // 50
  room.showName(); // base
