A)
let store = {obj: {a:1}, user: {data:{age: 10, name: "Test"}}, c:2};
//mapStateToProps
const {user:{data}} = store;

//change obj (NO an user data) in store by action
store = {...store, obj: {a:2}};

//mapStateToProps
const n = store.user.data;

//componentDidUpdate(prevProps) {
// prevProps.data === this.props.n
// }
//after changing only 'obj' in store, 'data' from (store.user.data) and 'data'(or 'n') from {user:{data}} = store) still have the references to the same object (actually,
//**we don't pay attention on a store or user objects reference, only on data object reference)
n === data; // true

B)
let store = {obj: {a:1}, user: {data:{age: 10, name: "Test"}}, c:2};

const {user:{data}} = store;

//change user data in store by action
//now 'data' has a reference on a new object because it's assigned as a new object using literal notation {}
//**we don't pay attention on a store or user objects reference, only on data object reference)
store = {...store, user: {...store.user, data: {...store.user.data, age: 20}}};

const n = store.user.data;

//now 'data' from {user:{data}} = store) and 'data' (or 'n') from store.user.data has the references to the different objects
n !== data; //true
