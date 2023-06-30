import { Link } from "react-router-dom";
import Header from "../Components/Header";
import Icons from "../Components/Icons";
import InputIcon from "../Components/InputIcon";
import PrimaryButton from "../Components/PrimaryButton";

export default function Login() {
  return (
    <div className="flex h-full flex-col items-center">
      <Header>Login</Header>

      <form className="mb-4 mt-8 flex w-full max-w-md flex-auto flex-col justify-between gap-4 md:justify-start">
        <div className="flex flex-col items-center justify-center gap-y-4">
          <InputIcon type="text" placeholder="Username">
            <Icons.User className="h-5 w-5 text-text" />
          </InputIcon>
          <InputIcon type="password" placeholder="Password">
            <Icons.Lock className="h-5 w-5 text-text" />
          </InputIcon>
        </div>

        <div className="flex flex-col items-center justify-center gap-y-4 md:flex-col-reverse">
          <p className="text-text/80">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-accent">
              Register
            </Link>
          </p>

          <PrimaryButton className="w-full">
            Login <Icons.Login className="h-5 w-5" />
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
}
