Iterable - структура даних (не об'єкти), по яких можна ітеруватись циклом 'for .. of'
і для яких працює spread оператор в масиві ([...obj], а не в {...obj},
тобто для яких спрацює [...array], [...string], [...map], [...set].
Хоча і map і set - це типу як {'a' => 1, 'b' => 2} і {'a', 'b'}).

Сюди відносять:
- array
- string
- список DOM-вузлів
- Set
- Map

//**
onst obj = {
from: 1,
to: 5,
};

obj[Symbol.iterator] = function() {
  let curr = this.from;
  const last = this.to;

  return {
    next() {
     if(curr <= last) {
       return {
         done: false,
         value: curr++
       }
     } else {
       return {
         done: true
       }
     }
   }
 }
};

for(const val of obj) console.log(val); //=> 1,2,3,4,5
const a = [...obj]; //=> [1, 2, 3, 4, 5];
const b = {...obj}; //=> {from: 1, to: 5, Symbol(Symbol.iterator): ƒ}
//** можна стверджувати, що коли ми пишемо спред у массиві, то завжди викликається for ... of

//** own puzzle
const obj = {a:'yellow', b:'green', c: 'red'};
// A) using simple  Object.values():
for(const val of Object.values(obj)) console.log(val); //=> yellow, green, red

// B) using Symbol.iterator:
obj[Symbol.iterator] = function(){
  //const countProps = Object.getOwnPropertyNames(this).length;
  const keysArr = Object.keys(this);
  const objLength = keysArr.length;
  let curr = 0;

  return {
    flag: this,
    next(){
      if(curr <= objLength) return {
                                     done: false,
                                     value: this.flag[keysArr[curr++]]
                            };

        return {done: true}
    }
  };
};
for(const val of obj) console.log(val); //=> yellow, green, red
console.log([...obj]); //=> [yellow, green, red]