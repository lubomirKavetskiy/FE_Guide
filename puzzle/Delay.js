const foo = () => console.log(12);

function debounce(callback, wait) {
  let timeout;

  return function() {
    const context = this;
    clearTimeout(timeout);

    timeout = setTimeout(function () {
      callback.apply(context, arguments);
    }, wait);
  };
};

function debounce_2(callback, wait) {
  let timeout;

  return (...args) => {
    const context = this;
    clearTimeout(timeout);

    timeout = setTimeout(function () {
      callback.apply(context, args);
    }, wait);
  };
}

function debounce_3(callback, wait) {
  let timeout;

  return (...args) => {
    const context = this;
    clearTimeout(timeout);

    timeout = setTimeout(function () {
      callback.call(context, ...args);
    }, wait);
  };
}

const result = debounce(foo, 5000);
result();

const delayPromise = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
delayPromise(3000).then(() => foo());

const delayPF = async (f, ms) => {
  await new Promise((res) => setTimeout(res, ms));
  f();
};
delayPF(foo, 3000);

//////==========///////
//arguments is usefull if we can't predict how many parameters will be passed into function
//non arrow function has arguments
function foo_1() {
  console.log(arguments);
}

foo_1(1,2); //[1,2]

//arrow function doesn't have arguments
//but we can receive it using rest
const foo_2 = (...args) => {
  console.log(args);
}
foo_2(1,2); //[1,2]

///////============////////
const foo = (...args) => args;
foo(1,2,3); // [1,2,3]
foo([1,2,3]); // [1,2,3]


const bar = (a, b) => console.log(b,a);
bar(...[2,3]); //2 3
