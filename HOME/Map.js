//** Map - колекція для зберігання запису типу ключ-значення.
//** Ключем може бути будь-який тип, проте він є завжди унікальним (якщо ключ примітив, а не 'object' !!!)
const map = new Map();
map.set(1, true).set(0, false);
//** або const map = new Map([[1, true], [0, false]]);
map; //=> Map {1 => true, 0 => false}
[...map] ~~ Array.from(map) == [[1, true], [0, false]]

map.get(1); //=> true
map.size; //=> 2
map.delete(1);
map.has(0); //=> true
map.clear(); //=> Map {}

//** ітерації:
const map = new Map([[1, true], [0, false]]);
map; //=> {1 => true, 0 => false}

map.keys(); //=> MapIterator {1, 0}
map.values(); //=> MapIterator {true, false}
map.entries(); //=> MapIterator {1 => true, 0 => false}

for (const key of map.keys()) console.log(key); //=> 1; 0

for (const value of map.values()) console.log(value); //=> true; false

for (const entr of map.entries()) console.log(entr); //=> [1, true]; [0, false]
*це те саме, що пройтись for .. of по map: for (const val of map) console.log(val); //=> [1, true]; [0, false]
for(const [key, value] of map) console.log(`${key}: ${value}`); //=> 1: 10, 2: 20

map.forEach((val, key, map) => console.log(`${val}, ${key}, ${map}`)); //=> true, 1, [object Map]; false, 0, [object Map]

для всіх ітераторів (map вцілому, для його keys(), values() та entries()) можна використовувати метод Array.from для отримання масиву:
Array.from(map); //=> [[1, true], [0, false]]
Array.from(map.keys()); //=> [1, 0]
Array.from(map.values()); //=> [[true, false]
Array.from(map.entries()); //=> [[1, true], [0, false]]

// або використати spread-оператор:
[...map]; //=> [[1, true], [0, false]]
[...map.keys())]; //=> [1, 0]
[...map.values()]; //=> [[true, false]
[...map.entries()]; //=> [[1, true], [0, false]]

//** плюсом є те, що при ітерації зберігається порядок ключів-значень


Set - колекція унікальних елементів будь-якого типу.
const set = new Set();
const a = {n: 'a', v: 1};
const b = {n: 'b', v: 2};

set.add(a).add(b).add(a);
//** або const set = new Set([a, b]);
[...set] ~~ Array.from(set) == [{n: 'a', v: 1}, {n: 'b', v: 2}]

set; //=> Set(2) {{n: 'a', v: 1}, {n: 'b', v: 2}}
set.size; //=> 2
set.delete(a); //=> true
set.has(a); /=> false
set.clear();
set; //=> Set(0) {}
**не має .get()

//** ітерації:
const set = new Set([5, 100, 25]);
set; //=> Set(3) {5, 100, 25}

set.keys(); //=> SetIterator {5, 100, 25}
for(const val of set.keys()) console.log(val); //=> 5; 100; 25
**keys() == values()
set.values(); //=> SetIterator {5, 100, 25}
for(const val of set.values()) console.log(val); //=> 5; 100; 25

set.entries(); //=> SetIterator {5, 100, 25}
for(const entr of set.entries()) console.log(entr); //=> [5, 5]; [100, 100]; [25, 25]

for(const val of set) console.log(val); => 5; 100; 25

set.forEach((val, valAgain, set)=> console.log(val === valAgain)); //=> true; true; true

для всіх ітераторів (set вцілому, для його keys() та entries()) можна використовувати метод Array.from для отримання масиву:
Array.from(set); //=> [5, 100, 25]
Array.from(set.keys()); //=> [5, 100, 25]
Array.from(set.entries()); //=> [[5, 5], [100, 100], [25, 25]]

***for..in НЕ ПРАЦЮЄ як для Map так і для Set

// filtered array
const arr = [5, 10, 1, 5, 2, 1, 10];
const filteredArr = [... new Set(arr)]; //=> [5, 10, 1, 2]