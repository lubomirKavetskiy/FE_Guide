const foo = () => console.log(12);

function debounce(callback, wait) {
  let timeout;

  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      callback.apply(context, args);
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
