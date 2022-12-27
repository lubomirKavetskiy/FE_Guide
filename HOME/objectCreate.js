

  // Method Object.create(proto, { descriptors });
    // об'єкт на основі якого буде створений новий об'єкт (default undefined)
    // **descriptors:
    // configurable: рівний true, якщо тип властивості може бути змінений або сама властивість може бути видаленою (default: false)
    // enumerable: рівний true, якщо цю властивість можна побачити методом перебирання за допомогою циклу (default: false)
    // value: значення нової проперті (будь-який тип) (default: undefined)
    // writable: рівний true, якщо значення властивості може бути перезаписане (default: false)
    // get:
    // set:
    //** ці всі descriptors стосуються властивостей якими доповнюється новий обєкт на основі існуючого proto. Тут працює метод Object.defineProperties(obj, {
  'property1': {
    value: true,
    writable: true
    ...
  },

    const proto = {a: 1, b: 2}
    const newObj = Object.create(proto, { addedProp: {value: 100, configurable: true, enumerable: true, writable: true}});
    console.log(newObj.__proto__); //=> {a: 1, b: 2}
    console.log(newObj); //=> {addedProp: 100};
    console.log(newObj.a); //=> 1
    newObj.addedProp = 300;
    console.log(newObj); //=> {addedProp: 300}; бо writable: true
    for(const key in newObj) {
      console.log(newObj[key]); //=> 300  1  2 бо enumerable: true
    }
    Object.keys(newObj); //=>['addedProp']
    Object.values(newObj); //=>[300]
    delete newObj.addedProp;
    console.log(newObj); //=> {} бо configurable: true

    newObj.addedNewMethod = () => 1000;
    newObj.addedNewProp = 1000;
    console.log(newObj); //=> {addedNewMethod: ƒ, addedNewProp: 1000}

//** зберігання ссилки
const proto = {a: 1, b: {c: 2}, d: [3], foo(){return true}};
const res = Object.create(proto);
res.a = 10;
res.b.c = 20;
res.b.e = 40;
res.d[0] = 30;
res.foo = function(){return false}
console.log(proto); //=> {a: 1, b: {c: 20, e: 40}, d: [30],foo(){return true}};

//** перепизаписування існуючої властивості з proto
const proto = {a:1, b: {c: 2}, foo(){return true}};
const res = Object.create(proto, {a: {value: 10}, b: {value: {c:20}}, foo: {value: function(){return false}}});
console.log(res); //=> {a:10, b: {c: 20}, foo(){return false}}
console.log(proto); //=> {a:1, b: {c: 2}, foo(){return true}

//** записування get і set:
const res = Object.create(null, {
  foo: {
    get: function () { return 1 },
    set: function (val) { this.a = val; }
  },
  a: {
    value: null,
    writable: true,
  },
});
console.log(res.a); //=> null
//** setter
res.foo = 100;
console.log(res.a); //=> 100
//** getter
console.log(res.foo); //=> 1
//** __proto__
console.log(res.__proto__); //=> undefined

//** Polyfill
// for IE-8:
    const foo = proto => {
      const Constr = function() {};
      Constr.prototype = proto;
      const constr = new Constr();
      return constr;
    }
//**
if (typeof Object.create != 'function') {
  Object.create = (function() {
    //** для економії пам'яті використовують загальний конструктор
    function Temp() {} // NOT use class Temp{}

    //** безпечна ссилка на Object.prototype.hasOwnProperty
    const checkHasOwnProp = Object.prototype.hasOwnProperty;

    return function (O) {
      // 1. якщо O не являється object || null => TypeError.
      if (typeof O != 'object') {
        throw TypeError('Object prototype may only be an Object or null');
      }

      // 2. Встановлюємо для Ф-їКонструктора Temp prototype, що = O
      Temp.prototype = O;

      // 3. Нехай obj буде результатом створення нового обєкту (типу як new Object(), де Object -
      // стандартний встроєний конструктор)
      const obj = new Temp(); // or even without brackets like this - 'new Temp',
			      // because () - isn't obligatory

      Temp.prototype = null; // Не будемо тримати випадкові ссилки на О ...
      //** obj.__proto__ == Object.getPrototype(obj) == Temp.prototype == O; всеодно працює,
      // бо ми оголосили const obj = new Temp(); вище

      // 4.  Якщо в метод окрім прототипу передати ще якісь проперті:
      // Object.create(prototype, {keyA: {value: 1}}), їх треба додати до obj,
      // типу як за допомогою встроєнного методу Object.defineProperties с аргументами Properties:
      if (arguments.length > 1) {
        const Properties = new Object(arguments[1]); // or even without new like this - 'Object(arguments[1])',
 				                 // because here new - isn't obligatory
	                                         // (there is used special property 'new.target')
        for(prop in Properties) {
          if (checkHasOwnProp.call(Properties, prop)) {
            obj[prop] = Properties[prop].value;
          }
        }
      }

      // 5. Повертаємо obj
      return obj;
    };
  })();
};


const a = {b:1};
const obj = Object.create(a);
obj; //=> {}
obj.b; //=> 1

a.b = 100;
obj.b; //=> 100

a.b.c = 2;
obj.b.c; //=> undefined

a.b = {c: 2};
obj.b.c; //=> 2