Encapsulation (hiding variables for external access)

class A {
    #privField: string = 'rt';

    constructor(public publField: number ){}

    set setPrivField(arg: string) {
        this.#privField = arg
    }

    get getPrivField(){return this.#privField}
};

const a = new A(100);
a.publField;
a.privField // Error
a.setPrivField = 'we';
console.log(a.getPrivField)

Polymorphism (ability redefine fields of the class)

class A {
  constructor(public a: number) {}

  say() {
    console.log(this.a);
  }
}

class B extends A {
  constructor(public a: number) {
    super(a);
  }

  say() {
    super.say();
    console.log('this methos is redefine');
  }
}

const a = new A(1);
a.say();

const b = new B(2);
b.say();

Composition vs inheritance
**https://www.youtube.com/watch?v=wfMtDGfHWpA&t=452s
Inheritance (when you design around your types what they ARE)
Animal
 .pook()

  Dog
   .bark()

  Cat
   .meow()


Robot
 .drive()

  CleanRobot
    clean()

  MurderRobot
    kill()


  RobotMurderDog
    drive() + kill() + bark() - pook()

Composition (when you design around your types what they DO)

dog: pooker + barker
cat: pooker + meower

cleanRobot: driver + cleaner
murderRobot: driver + killer

robotMurderDog: driver + killer + barker()

const driver = (state) => ({drive(){console.log(state)}});
const killer = () => ({kill(){console.log('kill')}});
const barker = () => ({bark(){console.log('bark')}});

const robotMurderDog = (name) => {
  let state = {
    name,
    speed: 100
  }

  return {...driver(state), ...killer(), ...barker()}
};

robotMurderDog('test').drive(); // log {name: "test", speed: 100}
robotMurderDog('teat').kill(); // log 'kill'


Composition with JavaScript Classes
**https://alligator.io/js/class-composition/
const FoodMixin = superClass => class extends superClass {eat(food) {console.log(food)}};
class Animal {
	constructor(name){
		this.name = name;
	}
};

class Dog extends FoodMixin(Animal) {
  constructor(...args) {
    super(...args)
  }

  bark() {
    console.log("Woff woff!")
  }

  haveLunch(food) {
    this.eat(food);
    this.poop();
  }
}

const jack = new Dog("jack");
jack.haveLunch("little mouse");

VM9269:1 little mouse