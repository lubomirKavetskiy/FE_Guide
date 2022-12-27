When a function is executed as new User(...), it does the following steps:

- A new empty object is created and assigned to this.
- The function body executes. Usually, it modifies this, adds new properties to it.
- The value of this is returned.

function User(name) {
  // this = {};  (implicitly)

  // add properties to this
  this.name = name;
  this.isAdmin = false;

  // return this;  (implicitly)
}


Inside a function, we can check whether it was called with new or without it, using a special new.target property.

function User() {
  console.log(new.target);
}

// without "new":
User(); // undefined

// with "new":
new User(); // function User { ... }

That can be used to allow both new and regular calls to work the same. That is, create the same object:

 function User(name) {
  if (!new.target) { // if you run me without new
    return new User(name); // ...I will add new for you
  }

  this.name = name;
}

let john = User("John"); // redirects call to new User
alert(john.name); // John


Return from constructors
<strong>return</strong> with an object returns that object, in all other cases <strong>this</strong> is returned:

A)
function User(name) {
  this.name = name;
  return {age: 100};
};

const user = new User("A");
￼
user; //=> {age: 100}

B)
function User(name) {
  this.name = name;
  return;
};

const user = new User("A");
user;
User {name: "A"}


Omitting parentheses
let user = new User; // <-- no parentheses
// same as
let user = new User();
** bad practice
// same as
(new User).name.....