const getName = (obj) => obj.name;
const uppercase = (str) => str.toUpperCase();

const pipe = (...fns) => (val) => fns.reduce((v, f) => f(v), val);
console.log(pipe(getName, uppercase)({name: 'me'}));

const compose = (...fns) => (val) => fns.reduceRight((v, f) => f(v), val)
console.log(compose(uppercase, getName)({name: 'me'}));
