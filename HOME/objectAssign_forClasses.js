class A {
  constructor(x, y) {
    Object.assign(this, { x, y });
  }
}

Object.assign(A.prototype, {
  foo() {
    return this.x;
  },
  moo() {
    return this.y;
  },
});

const a = new A(50, 100);
a.foo(); //=> 50
a.moo(); //=> 100
