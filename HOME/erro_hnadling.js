Зазвичай, у випадку помилки script ‘падає’ (відразу зупиняється), виводячии при цьому у консолі помилку.
Проте, є конструкція, яка дозволяє ловити помилки і робити дещо більш осмислине замість падіння.
Конструкція ‘try… catch’ складається із двох блоків.
Спочатку виконується код у блоці try і якщо у ньому не має помилок, то блок ‘catch’ ігнорується. У випадку помилки у блоці ‘try’ виконання решти коду у ньому ігнорується і управління потоком переходить у ‘catch’.
Таким чином, при помилці скрипт не ‘падає’ і ми отримуєму можливість обробити помилку у блоці ‘catch’.

try {
	console.log('try');
} catch(err) {
	console.log(err);
};
//try


try {
    console.log('try start');
    alert(unknownConst);
    console.log('wont console');
} catch(err) {
    console.log('executed catch');
};
// try start
// executed catch
)

Щоб спрацював try… сatch, код повинен бути коректним. Тобто, якщо міститься синтаксична поилка JS, то жоден із блоків не спрацює, бо JS спочатку читає кол (парсинг), а потім виконує його. І якщо є так помилка (синтксис), то движок JS просто не розуміє код.

try {
	console.log('try start'))))));
} catch(err) {
	console.log('executed catch');
};
Uncaught SyntaxError: Unexpected token
** це озачає, що в catch ніколи не попаде SyntaxError, хіба що скористатись throw new SyntaxError('such text')

try {
	console.log('try start'))))));
} catch(err) {
	console.log('executed catch');
};
Uncaught SyntaxError: Unexpected token
** це озачає, що в catch ніколи не попаде SyntaxError, хіба що скористатись throw new SyntaxError('such text')
try… catch працює синхронно.
Тут помилка не викинеться у catch, бо ф-я у try виконається пізніше, вже коли движок покинув цю конструкцію try.. catch.

try {
	setTimeout(()=>console.log(en), 2000); //in 2sec Uncaught ReferenceError: en is not defined
} catch(err) {
	console.log('wont execute');
};

try {
	setTimeout(()=>console.log(en), 2000); //in 2sec Uncaught ReferenceError: en is not defined
} catch(err) {
	console.log('wont execute');
};
Щоб зловити помилку у запланованіц ф-ї, потрібно помістити блок try… catch у саму ф-ю:

setTimeout(()=> {
	try {
		console.log(en);
	} catch(e) {
		console.log('error is caught'); //in 2sec error is caught
	}
}, 2000);

setTimeout(()=> {
	try {
		console.log(en);
	} catch(e) {
		console.log('error is caught'); //in 2sec error is caught
	}
}, 2000);
Об’єкт error.
У випадку виникнення помилки JS генерує об’єкт, який містить усі її деталі і передає його як аргумент у блок catch.

try {
		console.log(en);
	} catch({name, message, stack, ...rest}) {
		console.log({name, message, stack, rest});
	};
//{
message: "en is not defined,
name: "ReferenceError",
stack: "ReferenceError: en is not defined↵    at <anonymous>:2:15"
rest: {}
}

try {
		console.log(en);
	} catch({name, message, stack, ...rest}) {
		console.log({name, message, stack, rest});
	};
//{
message: "en is not defined,
name: "ReferenceError",
stack: "ReferenceError: en is not defined↵    at <anonymous>:2:15"
rest: {}
}
Типи поимилок:
ReferenceError викидається при посиланні на змінну, яка не була оголошена.
console.log(a);

SyntaxError викидається при спробі виконати код з порушеннями синтаксису.
console.log(a))));

TypeError викидається при використанні значення невідповідного типу.
const obj={};
obj.map(e=>1);

InternalError викидається при внутрішній помилці рушія JavaScript, наприклад при рекурсії.

RangeError викидається коли значення не входить у множину або діапазон дозволених значень.

URIError викидається коли до encodeURI() або decodeURI() передаються неправильні параметри.

EvalError викидається під час використання глобальної функції eval().

Оператор throw
throw генерує помилку.
Блок catch повинен обробляти тільки ті помилки, які йому відомі і прокидувати за допомогою throw усі решту у найближчий catch.

const json = '{"name": "hi"}';

const foo = () => {
  try {
    const user = JSON.parse(json);
	console.log(user.age.aaaaa); //here TypeError
  } catch(err) {
	if(err.name !== "ReferenceError") {
      throw err;
	}
  };
};

try {
  foo();
} catch(e) {
  console.log(111, e);
};
//111 TypeError: Cannot read property 'aaaaa' of undefined

const json = '{"name": "hi"}';

const foo = () => {
  try {
    const user = JSON.parse(json);
	console.log(user.age.aaaaa); //here TypeError
  } catch(err) {
	if(err.name !== "ReferenceError") {
      throw err;
	}
  };
};

try {
  foo();
} catch(e) {
  console.log(111, e);
};
//111 TypeError: Cannot read property 'aaaaa' of undefined
finally{}
Конструкція finally{} виконується у будь-якому випадку:
після try, якщо не було помилок;
після catch, якщо були помилки;

Також finally виконається і після return:

const foo = ()=> {
  try {
    console.log(1);

  } catch (e) {
    /* ... */
  } finally {
   console.log( 'finally' );
  }
}
foo(); //1 'finally'

Варіанти з return:
const foo = ()=> {
  try {
    return 2;

  } catch (e) {
    /* ... */
  } finally {
   console.log( 'finally' );
  }
}

foo(); //'finally' 2

const foo = ()=> {
  try {
    console.log(aaaa);
  } catch (e) {
    return 100;
  } finally {
   console.log( 'finally' );
  }
}

foo(); //'finally' 100


const foo = () => {
	try {
		throw 'error';
	} finally {
		console.log('finally');
	}
};

try {
	foo();
} catch(e) {
	console.log(e);
}; //'finally' 'error'

const foo = ()=> {
  try {
    console.log(1);

  } catch (e) {
    /* ... */
  } finally {
   console.log( 'finally' );
  }
}
foo(); //1 'finally'

Варіанти з return:
const foo = ()=> {
  try {
    return 2;

  } catch (e) {
    /* ... */
  } finally {
   console.log( 'finally' );
  }
}

foo(); //'finally' 2

const foo = ()=> {
  try {
    console.log(aaaa);
  } catch (e) {
    return 100;
  } finally {
   console.log( 'finally' );
  }
}

foo(); //'finally' 100


const foo = () => {
	try {
		throw 'error';
	} finally {
		console.log('finally');
	}
};

try {
	foo();
} catch(e) {
	console.log(e);
}; //'finally' 'error'
**finally отримує управління до того як контроль повертається у зовнішній код.

Якщо блок finally повертає значення, це значення повертається усією конструкцією try-catch-finally, не зважаючи на будь-які інші оператори return у блоках try та catch.

const foo = ()=> {
  try {
    console.log(aaaa);
  } catch (e) {
    return 100;
  } finally {
   console.log( 'finally' );
   return 500;
  }
}

foo(); //'finally' 500

const foo = ()=> {
  try {
    console.log(aaaa);
  } catch (e) {
    return 100;
  } finally {
   console.log( 'finally' );
   return 500;
  }
}

foo(); //'finally' 500
//example without 'try catch':
const res = async Api.getUer().catch();

fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => json)
  .catch(e=>e)
  .then(someth=> someth)
  .then(someth=> console.log(1, someth))
  .catch(e=>e);


const apiFetch = fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json());

const res = async apiFetch(json => console.log(json)).catch(e=>console.log(e));
res;

//example without 'try catch':
const res = async Api.getUer().catch();

fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => json)
  .catch(e=>e)
  .then(someth=> someth)
  .then(someth=> console.log(1, someth))
  .catch(e=>e);


const apiFetch = fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json());

const res = async apiFetch(json => console.log(json)).catch(e=>console.log(e));
res;
window.onerror — глобальний catch
Informational responses (100–199),
Successful responses (200–299),
Redirects (300–399),
Client errors (400–499):
400 Bad Request
401 Unauthorized
403 Forbidden
and Server errors (500–599).