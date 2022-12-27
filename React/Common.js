React hooks
React 16.8.0 is the first release to support Hooks. When upgrading, don’t forget to update all packages, including React DOM.
Hooks let you use state and other React features (lifecycle methods) without writing a class.
You can use the State Hook more than once in a single component.
However, unlike this.setState in a class, updating a state variable always replaces it instead of merging it. But you can reach it using this construction:

setState(prevState => {
// Object.assign would also work
return {…prevState, …updatedValues};
});

const Counter = ({ propsInitVal }) => {
  const [count, setCount] = useState(() => someFunc(propsInitVal));
  return (
    <>
      Counter: {count}
      <button onClick={() => setCount(someFunc(propsInitVal))}>Скинути</button>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>+</button>
      <button onClick={() => setCount((prevCount) => prevCount - 1)}>-</button>
    </>
  );
};
1
2
3
4
5
6
7
8
9
10
11
const Counter = ({ propsInitVal }) => {
  const [count, setCount] = useState(() => someFunc(propsInitVal));
  return (
    <>
      Counter: {count}
      <button onClick={() => setCount(someFunc(propsInitVal))}>Скинути</button>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>+</button>
      <button onClick={() => setCount((prevCount) => prevCount - 1)}>-</button>
    </>
  );
};
If you update a State Hook to the same value as the current state, React will bail out without rendering the children or firing effects. (React uses the Object.is comparison algorithm.)

By default, React runs the effects after every render — including the first render.
When React renders our component, it will remember the effect we used, and then (if change “dependency array” and executing condition (if it exists in effect)) run our useEffect after updating the DOM. This happens for every render, including the first one.
Just like with useState, you can use more than a single effect in a component.

How to get the previous props or state?:

const prevCountRef = useRef();

useEffect(() => {
  prevCountRef.current = counter;
});

render(
// here will be value previous because useEffect works after render and after changing
// prevCountRef.current in useEffect, won't be rerender (here useEffect doesn't change state for example,
// so it doesn't cause rerender) and value will be previous
// only if happens rerender, prevCounter will replace with the value from the last useEffect

prevCounter: {prevCountRef.current} <br />
)

or use useHook:
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const prevCount = usePrevious(count);

const prevCountRef = useRef();

useEffect(() => {
  prevCountRef.current = counter;
});

render(
// here will be value previous because useEffect works after render and after changing
// prevCountRef.current in useEffect, won't be rerender (here useEffect doesn't change state for example,
// so it doesn't cause rerender) and value will be previous
// only if happens rerender, prevCounter will replace with the value from the last useEffect

prevCounter: {prevCountRef.current} <br />
)

or use useHook:
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const prevCount = usePrevious(count);
Rules of Hooks:
Call Hooks only at the Top Level of your React function.
Call Hooks from React function components or custom Hooks.

const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      // a) bad way:count always === 0, because closure with the value of count
      // setCount(count + 1);

      // b) interval will be reset (*** like unmount lifecycle) on every change of 'count'
      // setCount(count + 1);

      // c) good way: called 'c' in the callback here
      setCount((c) => c + 1);
    }, 3000);
    return () => {
      console.log("mount");
      clearInterval(id);
    };
    // b) bad way: interval will be reset  (*** like unmount lifecycle) on every change of 'count'
    // }, [count]);
  }, []);

const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      // a) bad way:count always === 0, because closure with the value of count
      // setCount(count + 1);

      // b) interval will be reset (*** like unmount lifecycle) on every change of 'count'
      // setCount(count + 1);

      // c) good way: called 'c' in the callback here
      setCount((c) => c + 1);
    }, 3000);
    return () => {
      console.log("mount");
      clearInterval(id);
    };
    // b) bad way: interval will be reset  (*** like unmount lifecycle) on every change of 'count'
    // }, [count]);
  }, []);
*** When exactly does React clean up an effect?
React performs the cleanup when the component unmounts. However, as we learned earlier, effects run for every render and not just once. This is why React also cleans up effects from the previous render before running the effects next time.
Тобто, перед кожним наступним виконанням foo спочатку спрацює cleanUp. Цей функціонал схожий до componentWillUnMount, але він буде срацьовувати окрім як на componentWillUnMount, так і ще перед кожним настуним виокннаям фу-ї з useEffect, при зміні умови (параметру у []):
React.useEffect(()=>{ foo(); return ()=>cleanUp()}, [param]);

Remember that the function passed to useMemo runs during rendering.
Don’t do anything there that you wouldn’t normally do while rendering.
For example, side effects belong in useEffect, not useMemo.

Conveniently, useMemo also lets you skip an expensive re-render of a child:

function Parent({ a, b }) {
  // Only re-rendered if `a` changes:
  const child1 = useMemo(() => <Child1 a={a} />, [a]);
  // Only re-rendered if `b` changes:
  const child2 = useMemo(() => <Child2 b={b} />, [b]);
  return (
    <>
      {child1}
      {child2}
    </>
  )
}

Conveniently, useMemo also lets you skip an expensive re-render of a child:

function Parent({ a, b }) {
  // Only re-rendered if `a` changes:
  const child1 = useMemo(() => <Child1 a={a} />, [a]);
  // Only re-rendered if `b` changes:
  const child2 = useMemo(() => <Child2 b={b} />, [b]);
  return (
    <>
      {child1}
      {child2}
    </>
  )
}
function Table(props) {
  // ⚠️ createRows() is called on every render
  const [rows, setRows] = useState(createRows(props.count));

  // ✅ createRows() is only called once
  const [rows, setRows] = useState(() => createRows(props.count));
  // ...
}

function Table(props) {
  // ⚠️ createRows() is called on every render
  const [rows, setRows] = useState(createRows(props.count));

  // ✅ createRows() is only called once
  const [rows, setRows] = useState(() => createRows(props.count));
  // ...
}
Render same Components using array:
https://drive.google.com/file/d/1sI3sqi2lk5OkJ62QXda4ojXjOE0nmS1j/view?usp=sharing


React-patterns
// 1) container-pattern: divides react-components on smart(stateful or container) and dumb
// (presentational) components. The first (as a rule class-components) keep track of 'state' and concern
// with how things work. As for the second (as a rule function-components), they responsible only to
// present smth to DOM and don't have any logic inside.

// 2) render-props:
// a) separates 'state' from the 'presentation'
Counter
state
func => change state
render <>{props.children({state, func})}</>

App
render {{(state, func)=>

React-patterns
// 1) container-pattern: divides react-components on smart(stateful or container) and dumb
// (presentational) components. The first (as a rule class-components) keep track of 'state' and concern
// with how things work. As for the second (as a rule function-components), they responsible only to
// present smth to DOM and don't have any logic inside.

// 2) render-props:
// a) separates 'state' from the 'presentation'
Counter
state
func => change state
render <>{props.children({state, func})}</>

App
render {{(state, func)=>
{state}
}

}

//** Grandparent.js
<Grandparent>
  <Parent a="a" b="b" />
<Grandparent>

A) using class component:
//** **also here you can create and pass object const props = {a: 10, b:20}
//** Parent
class Parent extends React.Component {
  render() {
    return (
      <Child {...this.props} />
    );
//** or even like this
  render() {
    const {a, ...rest} = this.props;
    return (
      <Child a={a} {...rest} />
    );
  }
}
//** Child.js
const Child = (props) => <div>{`a equals ${props.a} and b equals ${props.b}`}</div>

B) using stateless (functional) component:
//** Parent
const Parent = ({ a, ...rest }) => <Child a={a} {...rest} />
//** Child.js
const Child = (props) => <div>{`a equals ${props.a} and b equals ${props.b}`}</div>


for generics
export const requireAuth = (path: string) => (ChildComponent: any) => {
   class ComposedComponent extends Component {
.
.
.
.
   return connect(mapStateToProps)(ComposedComponent);
};

@requireAuth('/')
export class Child extends Component {
....
}

//** Grandparent.js
<Grandparent>
  <Parent a="a" b="b" />
<Grandparent>

A) using class component:
//** **also here you can create and pass object const props = {a: 10, b:20}
//** Parent
class Parent extends React.Component {
  render() {
    return (
      <Child {...this.props} />
    );
//** or even like this
  render() {
    const {a, ...rest} = this.props;
    return (
      <Child a={a} {...rest} />
    );
  }
}
//** Child.js
const Child = (props) => <div>{`a equals ${props.a} and b equals ${props.b}`}</div>

B) using stateless (functional) component:
//** Parent
const Parent = ({ a, ...rest }) => <Child a={a} {...rest} />
//** Child.js
const Child = (props) => <div>{`a equals ${props.a} and b equals ${props.b}`}</div>


for generics
export const requireAuth = (path: string) => (ChildComponent: any) => {
   class ComposedComponent extends Component {
.
.
.
.
   return connect(mapStateToProps)(ComposedComponent);
};

@requireAuth('/')
export class Child extends Component {
....
