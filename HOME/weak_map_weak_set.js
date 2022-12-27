WeakMap та WeakSet - особливий вид Map та Set, що дозволяє збірнику сміття видаляти його елементи. Для прикладу, у нас є об'єкти-юзери і ми хочемо зберігати для них інфо допоки вони на веб-пейджі, і видаляти їх, як тільки юзер покине сторінку (буде видалений). Тобто, це свого роду якась темп-інфо, яка потрібна лише тимчасово.
Якщо помістити цю інфо (у вигляді об'ктів) як ключі для WeakMap, то ця інфо буде видалена, як тільки видалиться сам WeakMap.
**В якості ключів можуть бути тільки обєкти.

const users = [
    {name: 'a' },
    {name: 'b' },
    {name: 'c' },
];

const weakMap = new WeakMap();

weakMap
.set(users[0], 0)
.set(users[1], 10)
.set(users[2], 20);

**для WeakMap існує тільки set(), delete(), get() та has() методи. Перебрати, клірнути, взнати довжину або побачити повністю його неможливо (бо збірник сміття може не встигнути видалити інфо або навпаки - на присвоїться якась додана інфо).

delete users[0] або переприсвоїти users[0] = {name: "A"}

weakMap.get(users[0]); //=> undefined

**weakMap.get(users[1]}); //=> 10
**weakMap.get({name: 'b'}); //=> undefined

**users[1].name = "bbb";
weakMap.get(users[1]}); //=> 10
**users[1] = {name: "bbb"};
weakMap.get(users[1]}); //=> undefined

WeakSet:
const users = [
    {name: 'a' },
    {name: 'b' },
    {name: 'c' },
];

const weakSet = new WeakSet();

weakSet
.add(users[0])
.add(users[1])

weakSet.has(users[0]); //=> true
**хоча якщо змінити так users[0].name = 'A';,
то ССИЛКА на цей об'єкт всеодно залишається спрацює:
weakSet.has(users[0]); //=> true

delete users[1] або переприсвоїти users[1] = {name: "B"}
weakSet.has(users[1]); //=> false

const arr = [{a:1}, 2];
const mmap = new Map([[arr[0], 5], [arr[1], 20]]);
arr[0].a = 10;
mmap.get(arr[0]); // 5

const arr = [{a:1}, 2];
const weakMap = new WeakMap([[arr[0], 5]]);
arr[0].a = 10;
weakMap.get(arr[0]); // 5

Має тільки add(), has()