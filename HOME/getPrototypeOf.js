//** як відомо __proto__ - це браузерна штука, яка має статус депрікейт
//** тому замість __proto__ для отримання прототипу слід використовувати Object.getPrototypeOf(smth)
//** у браузері __proto__ - це властивість об'єкт, ссилка на prototype
//** .prototype можна застосувати лише для FuncConstr
//** __proto__ у браузері має кожен об'єкт, навіть саме .__proto__ і той же .prototype
//** бо вони є об'єктами
//** проте, у браузері .__proto__ і Object.getPrototypeOf(smth) працюють однаково, повертають одинаковий результат

function FuncConstr() {};
const exemp = new FuncConstr();
exemp.__proto__;
Object.getPrototypeOf(exemp) == FuncConstr.prototype == {constructor f} //=>true
//** exemp.__proto__ == FuncConstr.prototype //=>true

Object.getPrototypeOf(Object.getPrototypeOf(exemp)) == Object.getPrototypeOf(FuncConstr.prototype) == Object.prototype //true
//** exemp.__proto__.__proto__ == FuncConstr.prototype.__proto__ == Object.prototype //=>true

Object.getPrototypeOf(Object.prototype) == null //=>true
//** Object.prototype.__proto__ == null //=>true

FuncConstr.prototype = {a:1};
const exemp__2 = new FuncConstr();
Object.getPrototypeOf(exemp__2) == FuncConstr.prototype == {a: 1} //=>true

Object.getPrototypeOf(FuncConstr) != FuncConstr.prototype; //=> true
//** ƒ () { [native code] } != {a: 1}
//** у лівій частині цього порівняння FuncConstr.__proto__ - це не властивість-об'єкт
//** так як в правій частині.
//** Object.getPrototypeOf(smth) - це smth.__proto__, а не smth.prototype
Object.getPrototypeOf(Object.getPrototypeOf(exemp__2)) == Object.prototype; //=>true

class A {};
class B extends A {};
// B.prototype = new A();
const b = new B();

b.__proto__ == B.prototype; //=> true
b.__proto__.__proto__ == B.prototype.__proto__ && B.prototype.__proto__ == A.prototype; //=> true
b.__proto__.__proto__.__proto__ == B.prototype.__proto__.__proto__
&&
B.prototype.__proto__.__proto__ == A.prototype.__proto__
&&
A.prototype.__proto__ == Object.prototype; //=> true
Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(b))) == Object.prototype;