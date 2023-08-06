//Robert Martin
1.Single Responsibility
Every Class(Component) should have only one responsibility.
Split Component into small Componentns, create custom hooks
//////////////////////////////////////////////////////////////////
2. Open-closed
Software entity should be open to extension but closed to modificatian
We have a Button Component
interface IButtonProps {
  role: "back" | "forward";
}

export function Button({role}: IButtonProps) {
  return (
    <button>
      {role === "forward" && <ForwardIcon />
      {role === "back" && BackIcon />}
    </button>
  );
}
and we need to make left Button
bad approach:
to add    {role === "left" && <LeftIcon />
good approach:
use icon prop instead of role
interface IButtonProps {
  icon: ReactNode;
}

export function Button({icon}: IButtonProps) {
  return (
    <button>
      {icon}
    </button>
  );
}

//////////////////////////////////////////////////////////////////
3.Liskov Substitution
Об’єкти підтипу повинні замінювати об’єкти супертипу     
Subtype objects should be substitutable for supertype objects
we have SearchInput (it's subtype) with input (supertype)  
interface IProps {
  isLarge?: boolean;
  value: string;
  onChange: void;
}  
function SearchInput(props: ISearchInputProps) {
  const { value, onChange } = props;

  return (
    {isLarge ....}
    <input
          value={value}
          onChange={onChange}
    />
  )
Цей принцип говорить про те, що компонента SearchInput повинна приймати пропси з типом для input:
interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  isLarge: boolean;
}
function SearchInput(props: IProps) {
  const { value, onChange, isLarge, ...restProps } = props;

  return (
    {isLarge ....}
    <input
          value={value}
          onChange={onChange}
          {...restProps}
    />
  )

//////////////////////////////////////////////////////////////
4.Interface Segregation
clients should not depend upon interfaces they don't use
Component should not depend on the props that it doesn't use
interface IProps {
  product: {
    id: string;
    title: string;
    imgUrl: string;
  }
bad: const Product = ({product}) => <div>{product.name}<Image data={product} />
const Image = ({data}) => <img src={data.imgUrl} />

good: const Product = ({product}) => <div>{product.name}<Image imgUrl={product.imgUrl} />
const Image = ({data}) => <img src={data.imgUrl} />    

////////////////////////////////////////////////////////
5.Dependency Inversion
one Entity should depend on abstractions not concretions
make React Component standalone, allow it to extend
we have a Form Component
bad: function Form() {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await axios.post("https://localhost:3000/login", {
      email,
      password,
    });
  };

  return <form onSubmit={handleSubmit}

good:
 function Form() {
  const { onSubmit } = props;

  return <form onSubmit={onSubmit}

 const LoginForm = () => {
   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      await axios.post("https://localhost:3000/login", {
       email,
       password,
      });
    };
   return <Form onSubmit={handleSubmit}
