!! returns boolean type of value
console.log(!!4); // true

&& is looking for the first false and if doesn’t => returning last true:
console.log(true && 4); // 4

console.log(1 == true && 5); // 5

|| is looking for the first true and if doesn’t => returning last  false:
console.log(0 || false); // false

якщо використовувати операори в if(), то насправді script працює аналогічно до написаного вище, просто воно бере до уваги якщо результатом роботи оператора буде true, все що в {виконається}, і навпаки:

if (5 && 3) {console.log(true)}; // true, бо результатом роботи оператора буде 3, яке if побачить як true

if (5 || 3) {console.log(true)}; // true, бо результатом роботи оператора буде 5, яке if побачить як true