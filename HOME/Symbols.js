//** Symbol - новий примітивний тип даних, призначений для ств. анонімних, унікальних ідентифікаторів.
//** оголошення:
let symbol = Symbol();
//** задавання ім'я
let sym = Symbol('name');
//** тип
typeof symbol; //=> "symbol"
//** кожен символ є унікальним:
const a = Symbol('a');
const b = Symbol('a');
a == b; //=> false
a.description; // 'a'
//** глобальний реєстр символів:
a) створення символа у реєстрі:
const globaSymb = Symbol.for('name');
b) читання з реєстру:
Symbol.for('name'); //=> Symbol(name)
Symbol.for('name') == globaSymb; //=> true
//** отримати ім'я символа:
Symbol.keyFor(globaSymb); //=> "name"
//** причому і'мя існує тільки у символів із глобального реєстру
Symbol.keyFor(a); //=> undefined

//** використання символів
const b = Symbol.for("spec");
const obj = {
  a: 1,
  [b]: 100,
};
obj; //=> {a: 1, Symbol(spec): 100}
//** але в ітерації символ участі не приймає
for(const prop in obj) {
  console.log(obj[prop]);
}; //=> 1
Object.keys(obj); //=> ["a"]
//** доступ ЛИШЕ через глобальний символ
obj[Symbol.for('spec')]; //=> 100
obj[b]; // 100
//** але НЕ через ім'я
obj['spec']; //=> undefined
obj[Symbol.keyFor(b)]; //=> undefined

Object.getOwnPropertyNames(obj); //=> ["a"]
Object.getOwnPropertySymbols(obj); //=> [Symbol('spec')]
obj.hasOwnProperty(b); //=> true

//** системні символи доступні як властиості Symbol.
//** і їх можна викликати так:
obj[Symbol.iterator]; //=> func