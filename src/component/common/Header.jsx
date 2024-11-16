import logo from "../../assets/logo.svg";
import useAuth from "../../hooks/useAuth";
import LogIn from "../auth/LogIn";
import LogOut from "../auth/LogOut";

export default function Header() {
  const { auth } = useAuth();
  return (
    <header className="flex justify-between items-center mb-12">
      <img src={logo} className="h-7" />
      <div>{auth?.tokens?.accessToken ? <LogOut /> : <LogIn />}</div>
    </header>
  );
}
