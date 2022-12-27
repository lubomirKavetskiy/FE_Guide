// async / await
async / await allows us to work with asynchronous code like with synchronous.
The word “async” before a function means one simple thing: a function <strong>always returns a promise</strong>.
Even If a function actually returns a non-promise value, prepending the function definition with the “async” keyword directs Javascript to automatically wrap that value in a resolved promise:
const foo = async val => val;
foo(100).then(res=>console.log(res)); //=> 100 Pomise
// або так:
const foo = async val => Promise.resolve(val);
foo(100).then(res=>console.log(res)); 100 Pomise

The keyword await makes JavaScript wait until that promise settles and returns its result.
The await operator is used to wait for <strong>the only Promise</strong>. It can only be used inside an async function.

const foo = async (ms) => {
  console.log('start');
  const promise = new Promise((resolve, rejected) => {
    setTimeout(() => resolve(`we waited ${ms} ms`), ms);
  });

  console.log(await promise);   //*** here will pause that equals ms
  console.log('end');
};

foo(3000); //=> 1) 'start', 2) Promise {} 3) we waited 3000 ms 4) 'end'


We can't put 'await' in function without 'async'.

Also, we can use 'async' in classes methods:
class Waiter {
  async wait() {
    return Promise.resolve(100)
  };
};

new Waiter().wait().then(console.log); //=> 1


Error handling:
// puzzles
// delays
// async/await
A)
const delay = async (ms, func) => {
  const promise = new Promise((res, rej) => {
    setTimeout(res, ms);
  });

  await promise;
  func();
};
const foo_1 = val => () => console.log(val);

delay(2000, foo_1(100)); //=> about 2000ms -> 100

B)
const delay = async (ms, bool=true) => {
  const promise = new Promise((res, rej) => {
    setTimeout(bool ? res : rej, ms);
  });

  return await promise;
};

// using delay() in then/catch
delay(2000, false)
  .then(() => console.log(10))
  .catch(() => console.log(new Error('e'))); //=> Error: 'e'

// using delay() in async/await
const foo = async (ms, bool) => {
  try {
    await delay(ms, bool);
    console.log(1);
  } catch {
    console.log(new Error('e'));
  }
};

foo(2000); in 2000 ms -> 1
foo(2000, false); //=> in 2000 ms -> Error: 'e'

C)
class Delay {
  constructor(ms, bool=true) {
    this.ms = ms;
    this.bool = bool;
  }

  then(res, rej) {
    setTimeout(() => this.bool ? res() : rej(), this.ms);
  }
}

const foo = async ms => {
  await new Delay(ms);
  console.log(`it was pause ${ms}`);
};

foo(5000);






// promise - це свого роду об'єкт, у якого є властивість стейт,
// тобто він може перебувати у 3-х станах:
// очікування  -  pending
// виконано успішно  -  fulfilled
// виконано нуспішно  -  rejected
// для того щоб отримати проміс потрібно повернути обєкт із классу new Promise()
// сюди потрібно передати два параметри-функції new Promise(resolve, reject).
// тепер, викликаючи ф-ю resolve (наприклад на івентлістенер .onload = e => resolve(e.target.value),
// завантаження завершено), ми переведемо наш проміс у стан fulfilled (виконано успішно)
// і навпаки, наприклад на івентлістенер .onerror = reject(new Error("error") ми переведемо наш проміс
// у стан rejected.
// міняти місцями (resolve, reject) не можна, перший параметр - це ф-ія, яка переведе проміс у виконано успішно, другий - неуспішно
// хоча ці назви взяті як загальноприйняті.
// ці ф-ції resolve або reject повинні спрацьовувати при певних умовах, як правило при певних івентлістенерах
// або за допомогою setTimeout.
// перехід промісу із стану pending у стан fulfilled назив. розришенієм промісу.
// у кожного промісу, окрім властивості (умовної) стейт, є ще й властивість, яка зберігає чергу
// виконання якихось дій в момент розрішенія промісу (переходу із очікування у виконано успішно).
// ця черга (масив дій) виконується за допомогою методу промісу .then().
// якщо на якийсь один івентлістенер ми ставимо виконання і resolve() і rejecte(), то завжди буде виконаний лише перший,
// а другий проігнорований
// метод .then(()=>console.log()) не лише додає в чергу промісу якусь ф-ію, що виоконається після його роришенія,
// але й повертає цілом новий проміс, тобто ми знову можемо написати .then(....)

const promise = ms => new Promise((resolve, reject) => {
  setTimeout(()=>{
    resolve();
    console.log('resolved')
  }, ms);
});
// А)
promise(1000).then(()=>console.log(1));
promise(1000).then(()=>console.log(2));
// В)
promise(1000)
  .then(()=>console.log(1))
  .then(()=>console.log(2));

// різниця між А) і В) у тому, що в А) черга функцій записується в один проміс, а у B) кожного разу створюється новий проміс
// у який додається в чергу одна ф-я. Метод В) - це метод чейнінг (ланцюг).

// і якщо ми у метод .then() передаємо виконання обробника (у нашому випадку повертаємо новий проміс)
//, то він не почне виконуватись, допоки не розрішиться попередній проміс
// тобто такий процес є послідовним:
promise(1000)
  .then(()=>promise(2000))
  .then(()=>promise(3000));


// reject переводить проміс зі стану очікування у виконано невдало.
// для прикладу його можна викликати на івентлістенер .onerror
// у промісів є ще одна черга дій - це черга дій при переході промісу із стану очікування у стан виконано невдало
// ця черга дій (функція) додається у метод .then(), як другий параметр
promise(1000).
  then(
    ()=>console.log('resolved'), // ця дія виконається, якщо проміс перейшов у стан успішного виконання
    ()=>console.log('rejected')  // ця дія виконається, якщо проміс перейшов у стан неуспішного виконання
  );

  // тобто метод .then() 1) повертає новий проміс 2) додає в чергу дії, які повинні виконатись, якщо промісс виконаний успішно
// 3)додає в чергу дії, які повинні виконатись, якщо промісс виконаний неуспішно.


// щоб відловити еррор не потрібно в кожен then додавати другий параметр
// достатньо скористатись методом .catch()
// для прикладу маєм проміс для завантажування картинок:
const loadImg = url => new Promise((resolve, reject) => {
	const img = new Image();
	img.src = url;
	document.body.append(img);
	img.addEventListener('load', ()=>{resolve()});
	img.addEventListener('error', ()=>{reject()});
});
// якщо ми введемо некоректну урлу, то спрацює метод кетч
// і завантажуться лише дві перших картинки
// після чого в консолі ми отримаємо 'no'
loadImg('https://ucorrect')
	.then(()=>loadImg('https://correct url'))
	.then(()=>loadImg('https://UNCORRECT URL'))
	.then(()=>loadImg('https://correct url'))
	.then(()=>loadImg('https://correct url'))
	.catch(()=>console.log('no'));

// отримання даних із промісу
// нам потрібно у resolve(передати дані, проти лише один аргумент або массив)
// і потім їх отримати у методі then((як перший параметр)=>console.log())
// якщо ми використовуємо чейнінг (ланцюг) і ми хочемо прокидувати результат
// нам просто потрібно його ретурнити
promise()
  .then((response) => {
    console.log(response);
    return response;
    }
  )
  .then((response) => {
    console.log(response);
  }

  // це антипатерн коли глобальній перемінній присвоюють результат асинхронної дії
// тобто, коли ми хочемо синхронно отримати значення із асинхронної ф-ї проміс
let value;
new Promise(resolve=>{
  setTimeout(()=>{
    resolve()
  }, 1000);
}).then(() => value = 12345);


// використання промісів у методі fetch:
fetch(api) // результатом є проміс
      .then(response => response.json()) // тут для парсингу даних відповіді
                               // теж використовується асинхронна дія браузера
                               // тому теж вернеться проміс
      .then(({ results }) => {
        results.map(....))
// або fetch з використанням async await:
const fetchAndUseData = async () => {
  const response = await fetch('https://facebook.github.io/react-native/movies.json');
  const jsonData = await response.json(); // проміс із розпарсиними даними
  jsonData.map(....)
// }

// Promise.resolve(1) - створить виконаний проміс із результатом 1;
const resolvedPromise = Promise.resolve(1);
resolvedPromise.then(console.log); //=> 1

// Promise.reject(1) - створить виконаний проміс із результатом помилки
const rejectedPromise = Promise.reject(new Error("error"));
rejectedPromise.catch(console.log); //=> Error: error



// Promise.all чекає виконання всіх промісів і повертає їх у порядку заданому у масиві:
const a = new Promise(res=>setTimeout(res, 3000, 3));
const b = Promise.resolve(2);
const c = 3;

Promise.all([a, b, c]).then(console.log).catch(console.log); // [1, 2, 3]
// при наявності хоча б одного reject (навіть останнього), верне лише catch:
const d = Promise.reject('error');
Promise.all([a, b, c, d])
  .then(res=>console.log(res))
  .catch(e=>console.log(e)); // 'error'
  // це однакова запис
  .then(res=>console.log(res), ()=>console.log("error")); // 'error'

//
const a = new Promise((resolve, reject) => {
	setTimeout(resolve, 4000, 'first');
});
або так:
const a = new Promise((resolve, reject) => {
	setTimeout(() => resolve('first'), 4000);
});

const b = new Promise(resolve => {
	setTimeout(resolve, 2000, 'second');
});

Promise.all([a, b]).then(console.log); //=> ['first', 'second'];
// або так:
Promise.all([a, b]).then((res) => console.log(res)); //=> ['first', 'second'];

// puzzles:
const delay = (ms, bool=true) =>
  new Promise((resolve, reject) => {
    setTimeout(bool ? resolve : reject, ms)
  });


  // using delay() in then/catch
delay(2000)
.then(() => console.log(1)) //=> in 2000 ms -> 1
.catch(()=> console.log(new Error('e')));

delay(2000, 0)
.then(() => console.log(1))
.catch(()=> console.log(new Error('e'))); //=> in 2000 ms -> Error: 'e'

// using delay() in async/await
const foo = async (ms, bool) => {
try {
  await delay(ms, bool);
  console.log(1);
} catch {
  console.log(new Error('e'));
}
};

foo(2000); in 2000 ms -> 1
foo(2000, false); //=> in 2000 ms -> Error: 'e'


const delay = ms => new Promise(res => {
setTimeout(res, ms);
});

const interval = ms => new Promise(res => {
const inter = setInterval(()=>console.log('works interval 1 sec'), 1000);
setTimeout(()=>res(inter), ms);
});

delay(3000)
.then(()=>console.log("I've started in 3000ms"))
.then(() => interval(4000).then(clearInterval))
.then(()=>delay(3000).then(()=>console.log(`it was the end in 3000 sec after interval`)));
I've started in 3000ms
works interval 1 sec
works interval 1 sec
works interval 1 sec
it was the end in 3000 sec after interval