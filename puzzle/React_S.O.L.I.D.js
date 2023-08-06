//Robert Martin
1.Single Responsibility
Every Class(Component) should have only one responsibility.

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
