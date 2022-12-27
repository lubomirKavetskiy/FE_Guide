Options for mapState, mapDispatch and connect typing:

const mapState = ({ auth: { isFetching } }: RootStateType) => ({ isFetching });

const mapDispatch = {
  SignInAction,
};

A)
type TMapState = ReturnType<typeof mapState>
type TMapDispatch = typeof mapDispatch;
type TComponentProps = {};
type TProps = TComponentProps & TMapState & TMapDispatch;

const SignIn: FC<TProps> = ({ isFetching, SignInAction }) => {...

export default connect(mapState, mapDispatch)(SignIn)

B)
const connector = connect(mapState, mapDispatch);

type TPropsFromRedux = ConnectedProps<typeof connector>; //ConnectedProps from 'react-redux';
type TComponentProps = {};
type TProps = TPropsFromRedux & TComponentProps;

const SignIn: FC<TProps> = ({ isFetching, SignInAction }) => {...

export default connector(SignIn);
"Options for 'initialState' typing"
// A)
type initStateType = {
  userNames: {firstName: string; lastName?: string;} | null;
  keyy: number;
};

const initState: initStateType = {
  userNames: null,
  key: 1,
};

// B) export type for using also in Component for mapStateToProps
export type userNamesType = {
  firstName: string;
  lastName?: string;
};

const initState = {
  userNames: null as userNamesType | null,
  age: 1, // useless 'as number'
};

export const initStateType = typeof initState;

"Options for 'initialState' typing"
// A)
type initStateType = {
  userNames: {firstName: string; lastName?: string;} | null;
  keyy: number;
};

const initState: initStateType = {
  userNames: null,
  key: 1,
};

// B) export type for using also in Component for mapStateToProps
export type userNamesType = {
  firstName: string;
  lastName?: string;
};

const initState = {
  userNames: null as userNamesType | null,
  age: 1, // useless 'as number'
};

export const initStateType = typeof initState;
const num: number = 100;
const str: string = 'string';

const arr_1: number[] = [1, 2];
// generics
const arr_2: Array<number> = [1, 2];
// tuple
const arr_tuple: [number, string] = [1, 'string'];

// any
const willChange: any = 41;

// for function
const foo_1 = (name: string): string => name;
// or
function foo_1a(name: string): string { return name };

// void (return nothing)
function foo_2(name: string): void { console.log(name) };
// or
const foo_2a = (name: string): void => { console.log(name) };

// never
function throwError(err: string): never{ throw new Error(err) }

// type
type Login = string;
const login: Login = 'admin';
type ID = string | number;
const id_1: ID = 1;
const id_2: ID = 'str';


// interface
interface Rect {
    readonly id: string;
    color?: string;
    size: {
        width: number;
        height: number;
    };
};

const rect_1 = {} as Rect;
const rect_2 = <Rect>{};

// extending
interface RectWithArr extends Rect {
     // getArea(): number;
     // or
    getArea: () => number;
};
const rect_3: RectWithArr = {
    id: 'str',
    size: {
        width: 100,
        height: 200
    },
    getArea(): number { return this.size.height }
}

interface IClock {
    time: Date;
    // setDate(date: Date): void;
    // or
    setdate: (date: Date) => void ;
};

interface IStyles {
    [key: string]: string;
};


// enum
enum MemberShipEnum {
    Simple,
    Standart,
    Premium,
};

const membersip = MemberShipEnum.Premium; //3
const membersipRevers = MemberShipEnum[1]; //Standart

enum SocialMediaEnum {
    VK = 'VKontakte',
    FB = 'Facebook',
    IG = 'Instagram',
};

const social = SocialMediaEnum.VK; //'VKontakte'


// functions
function add_1(a: number, b: number): number {
    return a + b;
};
// or
const add_2 = (a: number, b: number): number => a + b;
 //example
interface IMyPosition {
    x: number | undefined;
    y: number | undefined;
};
interface IMyPositionWithDefault extends IMyPosition {
    def: string;
};

function position(): IMyPosition;
function position(a: number): IMyPositionWithDefault;
function position(a: number, b: number): IMyPosition;

function position(a?: number, b?: number) {
    if (!a && !b) {
        return {x: undefined, y: undefined}
    };

    if (a && !b) {
        return {x: a, y: undefined, def: a.toString() }
    };

    return { x: a, y: b };
};


// class
class Typescript {
    version: string;

    constructor(version: string) {
        this.version = version
    };

    info() {
        return `[${name}] : Typescript version is ${this.version}`
    };
};

 // generic
const arrOfNum: Array<number> = [1, 2];
const arrOfStr: Array<string> = ['a', 'b'];
const arrOfTuple: [number, string] = [1, 'a'];

function revers<T>(arr: T[]): T[] { return arr.reverse() };
revers(arrOfNum);
revers(arrOfStr);
revers(arrOfTuple);

// operators
interface Person {
    name: string;
    age: number;
};

type PersonKeys = keyof Person; // 'name' | 'age';

let key: PersonKeys = 'name';
key = 'age';
// key = 'error!!!';

type User = {
    id: number;
    name: string;
    email: string;
};

type UserKeysNoMeta_1 = Exclude<keyof User, 'id' | 'name'>; // can be only 'email' (string 'email', not {email" string})

type TUser = 'a' | 'b' | 'c';
type TUserA = Exclude<TUser, 'b' | 'c'>; // can be only 'a'

type OmitEmail = Omit<User, 'email'>;
const cc: OmitEmail = {id: 2, name: 'er'}


type UserKeysNoMeta_2 = Pick<User, 'id' | 'name'>; // 'id' and 'name' are required
Extract<'id' | 'email' | 'name', 'id' | 'email'>;
const email: ExtractEmail = 'id'

let u_1: UserKeysNoMeta_1 = 'email';
let u_2: UserKeysNoMeta_2 = {name: 'dfg', id: 5};

const num: number = 100;
const str: string = 'string';

const arr_1: number[] = [1, 2];
// generics
const arr_2: Array<number> = [1, 2];
// tuple
const arr_tuple: [number, string] = [1, 'string'];

// any
const willChange: any = 41;

// for function
const foo_1 = (name: string): string => name;
// or
function foo_1a(name: string): string { return name };

// void (return nothing)
function foo_2(name: string): void { console.log(name) };
// or
const foo_2a = (name: string): void => { console.log(name) };

// never
function throwError(err: string): never{ throw new Error(err) }

// type
type Login = string;
const login: Login = 'admin';
type ID = string | number;
const id_1: ID = 1;
const id_2: ID = 'str';


// interface
interface Rect {
    readonly id: string;
    color?: string;
    size: {
        width: number;
        height: number;
    };
};

const rect_1 = {} as Rect;
const rect_2 = <Rect>{};

// extending
interface RectWithArr extends Rect {
     // getArea(): number;
     // or
    getArea: () => number;
};
const rect_3: RectWithArr = {
    id: 'str',
    size: {
        width: 100,
        height: 200
    },
    getArea(): number { return this.size.height }
}

interface IClock {
    time: Date;
    // setDate(date: Date): void;
    // or
    setdate: (date: Date) => void ;
};

interface IStyles {
    [key: string]: string;
};


// enum
enum MemberShipEnum {
    Simple,
    Standart,
    Premium,
};

const membersip = MemberShipEnum.Premium; //3
const membersipRevers = MemberShipEnum[1]; //Standart

enum SocialMediaEnum {
    VK = 'VKontakte',
    FB = 'Facebook',
    IG = 'Instagram',
};

const social = SocialMediaEnum.VK; //'VKontakte'


// functions
function add_1(a: number, b: number): number {
    return a + b;
};
// or
const add_2 = (a: number, b: number): number => a + b;
 //example
interface IMyPosition {
    x: number | undefined;
    y: number | undefined;
};
interface IMyPositionWithDefault extends IMyPosition {
    def: string;
};

function position(): IMyPosition;
function position(a: number): IMyPositionWithDefault;
function position(a: number, b: number): IMyPosition;

function position(a?: number, b?: number) {
    if (!a && !b) {
        return {x: undefined, y: undefined}
    };

    if (a && !b) {
        return {x: a, y: undefined, def: a.toString() }
    };

    return { x: a, y: b };
};


// class
class Typescript {
    version: string;

    constructor(version: string) {
        this.version = version
    };

    info() {
        return `[${name}] : Typescript version is ${this.version}`
    };
};

 // generic
const arrOfNum: Array<number> = [1, 2];
const arrOfStr: Array<string> = ['a', 'b'];
const arrOfTuple: [number, string] = [1, 'a'];

function revers<T>(arr: T[]): T[] { return arr.reverse() };
revers(arrOfNum);
revers(arrOfStr);
revers(arrOfTuple);

// operators
interface Person {
    name: string;
    age: number;
};

type PersonKeys = keyof Person; // 'name' | 'age';

let key: PersonKeys = 'name';
key = 'age';
// key = 'error!!!';

type User = {
    id: number;
    name: string;
    email: string;
};

type UserKeysNoMeta_1 = Exclude<keyof User, 'id' | 'name'>; // can be only 'email' (string 'email', not {email" string})

type TUser = 'a' | 'b' | 'c';
type TUserA = Exclude<TUser, 'b' | 'c'>>; // can be only 'a'

type OmitEmail = Omit<User, 'email'>;
const cc: OmitEmail = {id: 2, name: 'er'}


type UserKeysNoMeta_2 = Pick<User, 'id' | 'name'>; // 'id' and 'name' are required
Extract<'id' | 'email' | 'name', 'id' | 'email'>;
const email: ExtractEmail = 'id'

let u_1: UserKeysNoMeta_1 = 'email';
let u_2: UserKeysNoMeta_2 = {name: 'dfg', id: 5};
//************* Variable Types *************//
//===== string, number, boolean ======//
let result: boolean = true;
let age: number = 100;
let sentence: string = `Hi, I am ${age}. It's ${result}`;
console.log(sentence);

//===== null, undefined ======//
let n: null = null;
let u: undefined = undefined;

//===== array ======//
let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];
let list3: [string, number] = ['hi', 2];

//===== enum ======//
enum Color {
	Red = 3,
	Green,
	Blue
}
let c: Color = Color.Green;
console.log(c); //=> 4

//===== any ======//
let randomValue: any = 10;
randomValue = true;
randomValue = 'any';
//randomValue();
randomValue.someProp;

//===== unknown ======//
let unkNownName: unknown = 111;
//(unkNownName as string).toUpperCase();

//===== function ======//
function hasName(obj: any): obj is { name: string } {
	return !!obj && typeof obj === 'object' && 'name' in obj;
}

console.log(hasName({ name: 'Vanja' }));

//=====  ======//
let a;
a = 10;
a = [1, 2, 3];
a = true;

let b = 100;
b = true; // error

//===== multitype ======//
let multitype: number | boolean;
multitype = 100;
multitype = false;
//*******************************************//

//************* Functions *************//
function add(num1: number = 10, num2?: number): number {
	return num1 + num2;
}

add(3, 5);
add(3);

//use interface or type for function//
interface ForFunc {
  (a: number): number;
}

type TForFunc = (a: number) => number;

const foo_1: ForFunc = num => num * 2;
const foo_2: TForFunc = num => num * 2;
//*******************************************//

//************* Interface *************//
interface Person {
	firstName: string;
	lastName?: string;
}

function fullName(person: Person) {
	console.log(`${person.firstName} ${person.lastName}`);
}

const p = {
	firstName: 'Bruce'
};

fullName(p);
//*******************************************//

//************* Class *************//
class Employee {
	employeeName: string;

	constructor(name: string) {
		this.employeeName = name;
	}

	greet() {
		console.log(`Good morning ${this.employeeName}`);
	}
}

const empl1 = new Employee('Somebody');

console.log(empl1.employeeName);
empl1.greet();

class Meneger extends Employee {
	constructor(managerName: string) {
		super(managerName);
	}

	delegateWork() {
		console.log('Manager works');
	}
}

const m1 = new Meneger('Bruce');
m1.delegateWork();
m1.greet();
console.log(m1.employeeName);


//************* Destructuring *************//
interface IProps {
onClick?(item: { key: string }): any;
}
onClick = {() => this.props.onClick(key)}

onPlaceClick = ({ key }: { key: string }) => {
  console.log('onPlaceClick');
.....
}

// Rest parameters
const foo = (first: number, ...restNumbers: number[]): string =>
  `${first} ${restNumbers.join(' ')}`;
console.log(foo(1, 2, 3, 4));

//************* Variable Types *************//
//===== string, number, boolean ======//
let result: boolean = true;
let age: number = 100;
let sentence: string = `Hi, I am ${age}. It's ${result}`;
console.log(sentence);

//===== null, undefined ======//
let n: null = null;
let u: undefined = undefined;

//===== array ======//
let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];
let list3: [string, number] = ['hi', 2];

//===== enum ======//
enum Color {
	Red = 3,
	Green,
	Blue
}
let c: Color = Color.Green;
console.log(c); //=> 4

//===== any ======//
let randomValue: any = 10;
randomValue = true;
randomValue = 'any';
//randomValue();
randomValue.someProp;

//===== unknown ======//
let unkNownName: unknown = 111;
//(unkNownName as string).toUpperCase();

//===== function ======//
function hasName(obj: any): obj is { name: string } {
	return !!obj && typeof obj === 'object' && 'name' in obj;
}

console.log(hasName({ name: 'Vanja' }));

//=====  ======//
let a;
a = 10;
a = [1, 2, 3];
a = true;

let b = 100;
b = true; // error

//===== multitype ======//
let multitype: number | boolean;
multitype = 100;
multitype = false;
//*******************************************//

//************* Functions *************//
function add(num1: number = 10, num2?: number): number {
	return num1 + num2;
}

add(3, 5);
add(3);

//use interface or type for function//
interface ForFunc {
  (a: number): number;
}

type TForFunc = (a: number) => number;

const foo_1: ForFunc = num => num * 2;
const foo_2: TForFunc = num => num * 2;
//*******************************************//

//************* Interface *************//
interface Person {
	firstName: string;
	lastName?: string;
}

function fullName(person: Person) {
	console.log(`${person.firstName} ${person.lastName}`);
}

const p = {
	firstName: 'Bruce'
};

fullName(p);
//*******************************************//

//************* Class *************//
class Employee {
	employeeName: string;

	constructor(name: string) {
		this.employeeName = name;
	}

	greet() {
		console.log(`Good morning ${this.employeeName}`);
	}
}

const empl1 = new Employee('Somebody');

console.log(empl1.employeeName);
empl1.greet();

class Meneger extends Employee {
	constructor(managerName: string) {
		super(managerName);
	}

	delegateWork() {
		console.log('Manager works');
	}
}

const m1 = new Meneger('Bruce');
m1.delegateWork();
m1.greet();
console.log(m1.employeeName);


//************* Destructuring *************//
interface IProps {
onClick?(item: { key: string }): any;
}
onClick = {() => this.props.onClick(key)}

onPlaceClick = ({ key }: { key: string }) => {
  console.log('onPlaceClick');
.....
}

// Rest parameters
const foo = (first: number, ...restNumbers: number[]): string =>
  `${first} ${restNumbers.join(' ')}`;
console.log(foo(1, 2, 3, 4));
class User {
	// public name: string;
	// private nickName: string;
	// protected age: number;
	// readonly pass: number;

	// constructor(name: string, nickName: string, age: number, pass: number) {
	// 	this.name = name;
	// 	this.nickName = nickName;
	// 	this.age = age;
	// 	this.pass = pass;
	// }
    static isInherited = true;
    // shorter note
    constructor(public name: string, private nickName: string, protected age: number, readonly pass: number ) { }

    //getter
    get getNickName() {return this.nickName}

    //setter
    set setNickName(newNickName: string) {this.nickName = newNickName}
};

// 4 access modifiers (модифікатори доступу) of class properties or methods
// public - значення по дефолту, передбачає вільний доступ з відусіль
// private - доступ лише в мажах классу, доступ за межами - відсутній (а ні класси-наслідники (сабкласси), а ні об'єкти-екземпляри не матимуть до них доступ); через this.privateMethod or this.privateprop не викликаються; позначаються через #method or #prop
// protected - доступ лише у классах та у сабклассах (класах-наслідниках), екземпляри классу (як бітьківського так і наслідуваного) доступу не мають;
// redonly - доступний лише для читання, змінити його не можливо


const roman = new User("Roman", "dev", 34, 123);

roman.name;         // "Roman"
roman.nickName;     // Property 'nickName' is private and only accessible within class 'User'
roman.age;          // Property 'age' is protected and only accessible within class 'User' and its subclasses (**subclass or inheritenced class, it's the same)
roman.pass = 9999;  // Cannot assign to 'pass' because it is a read-only property

//using getter and setter we can receive access to private property from the instance (екземпляр)
roman.getNickName; //'Roman'
roman.setNickName = "Ivan";
roman.getNickName; //"Ivan"
//!!!getters and setters can't be inheritanced

// changed static property is inherited
User_2.isInherited; //true
User.isInherited = false;
User_2.isInherited; // flase

class User {
	// public name: string;
	// private nickName: string;
	// protected age: number;
	// readonly pass: number;

	// constructor(name: string, nickName: string, age: number, pass: number) {
	// 	this.name = name;
	// 	this.nickName = nickName;
	// 	this.age = age;
	// 	this.pass = pass;
	// }
    static isInherited = true;
    // shorter note
    constructor(public name: string, private nickName: string, protected age: number, readonly pass: number ) { }

    //getter
    get getNickName() {return this.nickName}

    //setter
    set setNickName(newNickName: string) {this.nickName = newNickName}
};

// 4 access modifiers (модифікатори доступу) of class properties or methods
// public - значення по дефолту, передбачає вільний доступ з відусіль
// private - доступ лише в мажах классу, доступ за межами - відсутній (а ні класси-наслідники (сабкласси), а ні об'єкти-екземпляри не матимуть до них доступ); через this.privateMethod or this.privateprop не викликаються; позначаються через #method or #prop
// protected - доступ лише у классах та у сабклассах (класах-наслідниках), екземпляри классу (як бітьківського так і наслідуваного) доступу не мають;
// redonly - доступний лише для читання, змінити його не можливо


const roman = new User("Roman", "dev", 34, 123);

roman.name;         // "Roman"
roman.nickName;     // Property 'nickName' is private and only accessible within class 'User'
roman.age;          // Property 'age' is protected and only accessible within class 'User' and its subclasses (**subclass or inheritenced class, it's the same)
roman.pass = 9999;  // Cannot assign to 'pass' because it is a read-only property

//using getter and setter we can receive access to private property from the instance (екземпляр)
roman.getNickName; //'Roman'
roman.setNickName = "Ivan";
roman.getNickName; //"Ivan"
//!!!getters and setters can't be inheritanced

// changed static property is inherited
User_2.isInherited; //true
User.isInherited = false;
User_2.isInherited; // flase
type TA = {a: number};
type TB = {b: boolean};
type TC = {c: string};
type TAB = TA & TB & IC;
const abcType: TAB = {a: 1, b: true, c: 'interface'};

interface IA {a: 1};
interface IB {b: boolean};
interface IC {c: string};
interface IABC extends IA, IB, TC {};
const abcInterface: IABC = {a: 1, b: true, c: 'type'};

/////////////////////
const foo = <T extends TA, P extends object>(obj_1: T, obj_2: P): object => ({...obj_1, ...obj_2});

interface ITFoo {d: Array<number>, a: number};

foo<ITFoo, object>({d: [1,2], a:2}, {f: 5});


//////////
FORM elements
handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
handleTextAreaChange = (e:React.ChangeEvent<HTMLTextAreaElement>): void =>
handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>): void =>
handleBtnClick = (e: React.MouseEvent<HTMLButtonElement>): void =>
handleFormSubm = (e: React.FormEvent<HTMLFormElement>): void =>
handleInputCopy = (e: React.ClipboardEvent<HTMLInputElement>): void =>
private rootRef = React.createRed<HTMLInputElement>()

const a = 'const';
const b: typeof a = 'const'

let c = "let";
let d: typeof c = 'just a string'


type Type = {a: number, b: string}
let k: keyof Type;
k = 'a';
k = 'b'


const obj = {a:1, b: 'b'};
let f: typeof obj;
f = {a: 2, b: 'c'};

let i: keyof typeof obj;
i = 'a';
i = 'b'


enum G {
    a = 'a',
    b = 2
}

let h: keyof typeof G;
h = 'a'
h = 'b'


const foo = () => ({a: 1, b: 'str'});
let s: ReturnType<typeof foo>;
s = {a:2, b: 'another str'}


const xx = 'const';
let v: ReturnType<()=>typeof xx>;
v = 'const'

let yy = 'str';
let z: ReturnType<()=>typeof yy>;
v = 'just another str';

type TA = {a: number};
type TB = {b: boolean};
type TC = {c: string};
type TAB = TA & TB & IC;
const abcType: TAB = {a: 1, b: true, c: 'interface'};

interface IA {a: 1};
interface IB {b: boolean};
interface IC {c: string};
interface IABC extends IA, IB, TC {};
const abcInterface: IABC = {a: 1, b: true, c: 'type'};

/////////////////////
const foo = <T extends TA, P extends object>(obj_1: T, obj_2: P): object => ({...obj_1, ...obj_2});

interface ITFoo {d: Array<number>, a: number};

foo<ITFoo, object>({d: [1,2], a:2}, {f: 5});


//////////
FORM elements
handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
handleTextAreaChange = (e:React.ChangeEvent<HTMLTextAreaElement>): void =>
handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>): void =>
handleBtnClick = (e: React.MouseEvent<HTMLButtonElement>): void =>
handleFormSubm = (e: React.FormEvent<HTMLFormElement>): void =>
handleInputCopy = (e: React.ClipboardEvent<HTMLInputElement>): void =>
private rootRef = React.createRed<HTMLInputElement>()

const a = 'const';
const b: typeof a = 'const'

let c = "let";
let d: typeof c = 'just a string'


type Type = {a: number, b: string}
let k: keyof Type;
k = 'a';
k = 'b'


const obj = {a:1, b: 'b'};
let f: typeof obj;
f = {a: 2, b: 'c'};

let i: keyof typeof obj;
i = 'a';
i = 'b'


enum G {
    a = 'a',
    b = 2
}

let h: keyof typeof G;
h = 'a'
h = 'b'


const foo = () => ({a: 1, b: 'str'});
let s: ReturnType<typeof foo>;
s = {a:2, b: 'another str'}


const xx = 'const';
let v: ReturnType<()=>typeof xx>;
v = 'const'

let yy = 'str';
let z: ReturnType<()=>typeof yy>;
v = 'just another str';


https://stackoverflow.com/questions/37233735/interfaces-vs-types-in-typescript
https://mattferderer.com/difference-between-array-types-in-typescript