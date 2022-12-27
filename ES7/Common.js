class F {
constructor(n) {
  this.name = n;
}

method() { return this};
}
// class це "синтаксний цукор" ES6 для ф-й констркторів
// у классі, ф-я constructor() запускається у момент виклику new F()
// і завжди вертає об'кт на який вказує this, тобто this це {}
console.log(new F()); //=> {name: undefined}
const f = new F('Pety');
// f буде дорівнювати об'єкту, що вернеться, тобто це буде this
console.log(f); //=> {name: "Pety"}
// і f буде мати доступ до всіх методів классу
console.log(f.method()); //=> F {name: "Pety"}

// ми задаємо властивості цьому об'єкту через this. ,
// типу так: this.name = ...
// після constructor(){}, ми записуємо методи, як fuction declarrion,
// типу так: method() { ... };
// всі ці методи запишуться у prototype,
// типу так: F.prototype.metnod (*це видно лише в консолі)
// f.hasOwnProperty('method'); //=> false
// f.hasOwnProperty('name'); //=> true

// класс F не можна визивати без new, тобто тільки так new F();
// оголошення классу з точки зору області видимості веде себе як let,
// тобто видно лише в блоці {} і можна використовувати в коді, описаному нижче оголошення класу
//(не як function Declaration, яку можна юзати до оголошення)

// всі методи у классі працюють по замовчуванню в 'use strict'
// їх не можна перебрати циклом в об'єкті

// геттери, сеттери та вичисляємі властивості
class User {
constructor(fName, lName) {
  this.fName = fName;
  this.lName = lName;
}

get fullName() {
  return `${this.fName} ${this.lName}`;
}

set fullName(newName) {
  // переприсвоєння нових значень для властивостей об'єкту классу за допомогою деструктиризації
  // newName.split(' ') => перетворить строку у масив
  // тут використовуються [ ], не тому, що переприсвоюються значення властивостям, а тому
  // що параметр прийде як одна строка, і щоб її розбити, використовують деструктуризацію
  [this.fName, this.lName] = newName.split(' ');
}

// у классах, як і в об'єктах для вираховуваних імен властивостей (або методів)
// використовують [ ]
['test'.toUpperCase()]() {
  console.log('passed');
}
}

const user = new User('Petro', 'Oleksiyovich');
// геттери та сеттери це методи, але для отримання (get) або встановлення ()set, їх записують як властивості
// тобто так user.fullName або user.fullName = ...., а не так user.fullName()
// тому ми не пишемо user.fullName()
console.log(user.fullName); //=> Petro Oleksiyovich
user.fullName = 'Andriy Ivanovich';
console.log(user.fullName); //=>  Andriy Ivanovich
user.TEST(); // passed
// окрім цього, використання геттера у середині классу дозволяє нам викликати їх без '()'
// типу створити у цьому ж классі ще метод foo(), у якому б викликався цей геттер, для прикладу:
foo = () => {if(this.fullName === ....){...}
// бо інакше (якшо це не геттер), то треба так:
foo = () => {if(this.fullName() === ....){...}

// статичні методи классу
class Us {
constructor(fN, lN) {
  this.fN = fN;
  this.lN= lN;
}

// пишуться через static
static createNewUs(newfN, newlN) {
  return new Us(newfN, newlN);
}
}

const us = Us.createNewUs('Petro', 'Serhiyovich');
console.log(us.fN); //=> 'Petro'
console.log(Us.createNewUs); //=> createNewUs(newf....
// тобто, тут фішка в тому, що ми можемо напряму звернутись до методу классу (як всередині классу так і ззовні, для прикладу в іншому классі, це типу як глобальна перемінна...),
// чого не можна зробити без static (Us.creteNews() => error)

// наслідування
class Animal {
constructor(name) {
  this.name = name;
}

walk() {
  console.log(`${this.name} walks`);
}
}

// якщо наслідувати так: class Cat extends Animal {}, то все наслідується (і властивості і методи)
// ми можемо ВИКЛИКАТИ constructor або методи батька у потомку
// якщо ми хочемо у потомку дещо змінити наслідваний метод, зокрема його доповинити + викликати наслідуваний (батьківський)
// тоді використовуємо super.parentMethod(..arg)
// але тут доцільніше не казати "змінити якийсь метод", бо це заплутує (якісь зміни методів), а просто -
// сказати "створити власний потомківський метод, викликавши при цьому у ньому батьківський"
class Cat extends Animal {
// створення власного методу із використанням наслідуваного
walk() {
  super.walk(); // або this.walk();
  console.log('and jumps');
}
}

new Cat('Miki').walk(); //=> Miki walks
                         //and jumps

//якщо ж хочемо переписати наслідувану властивість (метод), тоді просто переписуємо
// типу так:
class Cat extends Animal {
// створення власного методу (преписування наслідуваного)
walk() {
  console.log(`${this.name} sings`);
}
}

new Cat("Kyzja").walk(); //=> Kyzja sings

// методи Animal і Cat записані в .prototype відповідно.
// методи Cat зв'язані за допомогою __proto__
// тобто Cat.prototype.__proto__ == Animal.prototype

// constructor() батька наслідується потомком автоматично
// тобто, якщо у потомка не вказаний свій, то використається батьківський.
// якщо у потомка свій constructor() і щоб викликати батьківський, роблять так:
class Dog extends Animal {
constructor(){
  // це виклик батьківського конструктора
  super('Markiz');
}
}
new Dog('ownName').walk(); //=> Markiz walks

// або можна викликати батьківсткий конструктор але перезатерти властивість батька
class Dog extends Animal {
constructor(own){
  // це виклик батьківського конструктора
  super('Markiz');
  // а тут можна прописати власні властивості конструктора
  // або перезатерти властивість батька
  this.name = own
}
}
new Dog('ownName').walk(); //=> ownName walks

// також в super можна передати аргумент для батькового constructor_а
class Animal {
constructor(name) {
  this.name = name;
}

walk() {
  console.log(`${this.name} walks`);
}
}

class Dog extends Animal {
constructor(forAnimalName, forDogColor){
  super(forAnimalName);
  this.color = forDogColor;
}
gav(){
  super.walk();
console.log(this.color);
}
}
new Dog('animal', 'red').gav(); //=> animal walks   red

// важливий момент, що super() можна визвати тільки з constructor()
// і в constructor()_і до написання super() ми не можемо писати this. ...
// типу так буде еррор
class Dog extends Animal {
constructor(){
  console.log(this); // error
  super('Markiz');
  //this можна тут викликати (після super())
}
}
new Dog().walk(); //=> Markiz walks

// отже, при наслідуванні, виклик батькового конструктора здійснюється через super(...arg)
// а виклик батьківстких методів через super.methodTitle(...arg)
// Class ES6
class Human {
constructor(){
this.gender = `male`;
}

printGender(){
console.log(this.gender);
}
}

class Person extends Human {
constructor(){
super();
this.name = `Max`;
this.gender = `female`;
}

printMyName(){
console.log(this.name);
}
}

const person = new Person();
person.printMyName(); // `Max`
person.printGender(); // `female`

class A {};
class B extends A {};
A.a = "a";
B.a; //=>"a"
new A().a; //=> unefined
new B().a; //=> unefined
A.prototype.a = 100;
new A().a; //=> 100
?? B.prototype.a; //=> 100 **можливо через те, шо B.prototype.__proto__ має ссилку на A.prototype
new B().a; //=> 100



// Class ES7 (працює тільки для React классів!!!)
  //
class Human {
gender = `male`;

printGender = () => console.log(this.gender);
}

class Person extends Human {
name = `Max`;
gender = `female`;

printMyName = () => console.log(this.name);
}

const person = new Person();
person.printMyName(); // `Max`
person.printGender(); // `Female`

// Class ES6
class Human {
constructor(){
this.gender = `male`;
}

printGender(){
console.log(this.gender);
}
}

class Person extends Human {
constructor(){
super();
this.name = `Max`;
this.gender = `female`;
}

printMyName(){
console.log(this.name);
}
}

const person = new Person();
person.printMyName(); // `Max`
person.printGender(); // `female`

class A {};
class B extends A {};
A.a = "a";
B.a; //=>"a"
new A().a; //=> unefined
new B().a; //=> unefined
A.prototype.a = 100;
new A().a; //=> 100
?? B.prototype.a; //=> 100 **можливо через те, шо B.prototype.__proto__ має ссилку на A.prototype
new B().a; //=> 100



// Class ES7 (працює тільки для React классів!!!)
  //
class Human {
gender = `male`;

printGender = () => console.log(this.gender);
}

class Person extends Human {
name = `Max`;
gender = `female`;

printMyName = () => console.log(this.name);
}

const person = new Person();
person.printMyName(); // `Max`
person.printGender(); // `Female`
//spread operator
//* doesn't return an array

//works with array
const oldArray = [1,2,3];
const newArray = [...oldArray, 4,5];
console.log(newArray); // [1,2,3,4,5]

const a = [1];
const b = [2];
console.log([...a, ...b]); // [1,2]

// works with object
const oldObject = {a:1, b:2};
const newObject = {...oldObject, c:3};
console.log(newObject); // {a:1, b:2, c:3}

const obj_1 = {a:1};
const obj_2 = {b:2};
console.log({...obj_1, ...obj_2}); // {a:1, b:2}

  //using spread operator allows us not to keep the reference to the original object or array (we prevent the mutation of the origin or our received new const). It's the same as Object.assign({}, origin)
 const origin = {a:1};
 const newConst = {...origin};
 origin.a = 10;
 newConst.a; //1
 newConst.a = 100;
 origin.a; //10

// Also, we can use spread operator of array or object in the method for pass it like a list. **These are not the rest parameters**
 const arr = [5]
 arr.push(...[10, 15]);
 arr; //[5, 10, 15]

 **use spread syntax in function:
 const sum = (a, b, c) => a + b + c;
 console.log(sum(...[5, 10, 15])); // 30
 **

let arr = [];
for(let a=1; a<=10; a++) arr = [...arr, a*2];
arr; //=> [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

similar to Object.keys()
[...arr.keys()]; //=> [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
Array.from(arr.keys()); //=> [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

similar to Object.values()
[...arr.values()]; //=> [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
Array.from(arr.values()); //=> [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

// rest parameters
// *always returns an array
// rest as argument in function
  // doesn't work with one passed array, it includes the passed arguments of function to one common array
const filter = (...args) => args.filter(el => el > 1);
console.log(filter(1,2,3)); // [2,3]

 **use rest parameters in function:
 const sum = (...numbers) => numbers.reduce((_, item)=> _ + item);
 console.log(sum(5, 10, 15)); //30

 BUT console.log(sum([5, 10, 15])); //[5, 10, 15] because in body it will come like wrapped in one more array [[5, 10, 15]]
 **
 const foo = (a, ...rest) => {
 console.log(a);

   for(const val of rest) {
     console.log(val);
   };
 };

 foo(2, 50, 100, 150); //=>
 2
 50
 100
 150

//rest syntax in destructuring
const [first, ...rest] = [1,2,3,4,5];
console.log(first); // 1
console.log(rest); // [2,3,4,5]

  const obj = {a: 1, b: 2, c: 3};
  const {b, ...rest} = obj;
  console.log(a); // 1
console.log(rest); // {a: 1, c: 3}

//spread operator
//* doesn't return an array

//works with array
const oldArray = [1,2,3];
const newArray = [...oldArray, 4,5];
console.log(newArray); // [1,2,3,4,5]

const a = [1];
const b = [2];
console.log([...a, ...b]); // [1,2]

// works with object
const oldObject = {a:1, b:2};
const newObject = {...oldObject, c:3};
console.log(newObject); // {a:1, b:2, c:3}

const obj_1 = {a:1};
const obj_2 = {b:2};
console.log({...obj_1, ...obj_2}); // {a:1, b:2}

  //using spread operator allows us not to keep the reference to the original object or array (we prevent the mutation of the origin or our received new const). It's the same as Object.assign({}, origin)
 const origin = {a:1};
 const newConst = {...origin};
 origin.a = 10;
 newConst.a; //1
 newConst.a = 100;
 origin.a; //10

// Also, we can use spread operator of array or object in the method for pass it like a list. **These are not the rest parameters**
 const arr = [5]
 arr.push(...[10, 15]);
 arr; //[5, 10, 15]

 **use spread syntax in function:
 const sum = (a, b, c) => a + b + c;
 console.log(sum(...[5, 10, 15])); // 30
 **

let arr = [];
for(let a=1; a<=10; a++) arr = [...arr, a*2];
arr; //=> [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

similar to Object.keys()
[...arr.keys()]; //=> [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
Array.from(arr.keys()); //=> [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

similar to Object.values()
[...arr.values()]; //=> [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
Array.from(arr.values()); //=> [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

// rest parameters
// *always returns an array
// rest as argument in function
  // doesn't work with one passed array, it includes the passed arguments of function to one common array
const filter = (...args) => args.filter(el => el > 1);
console.log(filter(1,2,3)); // [2,3]

 **use rest parameters in function:
 const sum = (...numbers) => numbers.reduce((_, item)=> _ + item);
 console.log(sum(5, 10, 15)); //30

 BUT console.log(sum([5, 10, 15])); //[5, 10, 15] because in body it will come like wrapped in one more array [[5, 10, 15]]
 **
 const foo = (a, ...rest) => {
 console.log(a);

   for(const val of rest) {
     console.log(val);
   };
 };

 foo(2, 50, 100, 150); //=>
 2
 50
 100
 150

//rest syntax in destructuring
const [first, ...rest] = [1,2,3,4,5];
console.log(first); // 1
console.log(rest); // [2,3,4,5]

  const obj = {a: 1, b: 2, c: 3};
  const {b, ...rest} = obj;
  console.log(a); // 1
console.log(rest); // {a: 1, c: 3}