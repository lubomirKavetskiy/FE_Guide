7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
166
167
168
169
JS - це однопотокова мова. Це означає, що весь код при виконанні (зверху вниз) по черзі заходить у call stack і накладається один на одного (останній стає першим). Якщо туди потрапляє асинхронний код (fetch, setTimeout, eventListener), то він потрапляє у WebAPIs. Там виконавшись, його колбекк заходить у queue. В цій черзі можуть перебувати як колбеки макротасок, так і мікротасок. Якщо колбек із промісом потрапив у чергу в якій вже є колбек із макротаскою, що чекає допоки звільниться коллстек, то колбек із промісом посуне його і стане першим у черзі та теж чекатиме звільнення колстеку.
Event loop власне слідкує за тим коли звільниться стек від синхронного коду і заштовхує з черги асинхронні колбеки.
Асинхронний код краще юзати, з точки зору, щоб відбувався перерендер сторінки і юзер міг контактувати з нею (наприклад виділяти текст). Бо якщо ми маємо синхронний код (для прикладу із тривалим делей), у нас не зможе відбутись тривалий час перерендер пейджі, що повинен робитись 60 разів на сек, бо стек буде зайнятим. А в асинхронному коді, після кожного колбеку, що закинувся у колл-стек івент лупом, буде очищатись стек і таким чином рендер пролазитиме у стек і перерендерюватиме пейджу.

async function f() {
  let promise = new Promise((resolve, reject) => {
    console.log(1);

    setTimeout(() => resolve(6), 3000);

    console.log(2)
  });

    console.log(3);

    let result = await promise; // wait till the promise resolves (*)

    console.log('5 will show throw 3000 ms');

    console.log(result);

    console.log('7');
}

f();
console.log(4);
//=>
1
2
3
4
5 will show throw 3000 ms
6
7


makro- and micro- tasks
.then/catch/finally is called after the current code is finished.
exists microtask queue. It means that, promise always will wait untill rest code will be done. For axample:
const promise = Promise.resolve('promise waited');
promise.then(console.log);
const a = 100;
console.log(a);
for(let i=0; i<1000; i++) {console.log(i)}; console.log(1==true);
// 100; 1 . . 1000 'promise waited'

If we want to get a result first, we need to use .then():
const promise = Promise.resolve('promise doesn't waite');

promise
  .then(console.log)
  .then(() => {for(let i=0; i<1000; i++) {console.log(i)}});

Fetch, setTimeou, mouseEvents - these are macrotask. Macrotasks run after the code is finished and after the microtask queue is empty. Events from the macrotask queue are processed on “first came from – first served” basis. (типу хто швиде обробився у WebAPIs і чий колбек скоріше прийшов у чергу макротасок - той і швидше попаде у колл-стек).

Promise (microtask) always will wait until the rest code will be done but it won't wait on macrotask:

async function f() {
  const response = await fetch('https://facebook.github.io/react-native/movies.json');
  const jsonResult = await response.json();
  console.log(jsonResult.title);
}
ф-я f - це мікротаска, бо вертає проміс, навіть якщо тут він дорівнює (той проміс) undefined.

const foo = () => {
  setTimeout(()=>console.log(3), 0);  //макротаска
  f(); //мікротаска
  for(let i=0; i<1000; i++) {console.log(i)}; //звичайний код
};

foo();
// 1....1000, title, 3
**допоки виконується звичайний код (консоллогиться цикл), у чергу заходить колбек макротаски (setTimeout), він там покищо єдиний. І тут приходить колбек мікротаски з title, але цикл ще не завершився консоллогитись. Мікро має пріоритет над макротаскою і по завершенню циклу, коли звільниться стек, її колбек заштовхується івент лупом в стек. Тобто, мікротаска випередила (посунула назад) у черзі цю макротаску.
Але, якщо б цикл відконсоллогився раніше за фетч з тайтлою (мікротаску), тобто у черзі ще б не було відповіді з тайтлою, а лише макротаска, то setTimeout спрацював би перед консоллогом з 'title'.


A)
(() =>; {
  setTimeout(() => console.log('timeout'), 2000);

  f();

  console.log(1);
})();
1
"title" - microtask
timeout in 2000ms - macrotask

!!! Але, якщо setTimeout встигає потрапити з queue у call stack коли там пусто (виконався синхронний код), а проміс ще не прийшов у queue (навіть з результатом undefined), то setTimeout (macrotask) виконається видшеб а ніж проміс (microtask):

B)
(() => {
  setTimeout(() => console.log('timeout'), 0);

  f();

  console.log(1);
})();
1
timeout - macrotask
"title" - microtask

код після await завжди буде чекати виконання коду (await code())

A)
(async () => {
    setTimeout(() => console.log('timeout'), 1000);

    await f();

    console.log(1);
})();
"title"
1 - чекає
timeout

!!! Але, якщо setTimeout встигає потрапити з queue у call stack коли там пусто (виконався синхронний код), а проміс ще не прийшов у queue (навіть з результатом undefined), то setTimeout (macrotask) виконається видшеб а ніж проміс (microtask):
B)
(async () => {
    setTimeout(() => console.log('timeout'), 0);

    await f();

    console.log(1);
})();
timeout - macrotask
"title" - microtask
1 - чекає


якщо біля await записати НЕ КОЛБЕК ІЗ ПРОМІСОМ, а наприклад асинхронний setTimeout, то код, що нижче не чекатиме:
A)
const foo = () => {setTimeout(()=>console.log('not promise'), 2000)}

(async () => {
    setTimeout(() => console.log('timeout'), 0);

    await foo();

    console.log(1);
})();
1
'timeout'
'not promise' in 2000ms
B)
(async () => {
    setTimeout(() => console.log('timeout'), 3000);


    await foo();
    console.log(1);
;
})();
1
'not promise' in 2000ms
'timeout'

C)
(async () => {
    setTimeout(() => console.log(2), 2000);


    await foo();
    console.log(1);
;
})();
1
2 in 2000ms
'not promise'