import { Link, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "../Components/Header";
import Icons from "../Components/Icons";
import InputIcon from "../Components/InputIcon";
import PrimaryButton from "../Components/PrimaryButton";
import { useRef, useState } from "react";
import Alert from "../Components/Alert";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export default function Login({ isLoggedIn, setToken }) {
  const usernameInput = useRef();
  const passwordInput = useRef();

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`${API_ENDPOINT}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernameInput.current.value,
        hash: passwordInput.current.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setToken(data.token);
        if (data.error) setIsError(true);
        setMessage(data.message);
      })
      .catch((e) => {
        setIsError(true);
        setMessage(e.message);
      });
  }

  {
    isError ? (
      <Alert
        icon={<Icons.ExclamationTri className="h-6 w-6 flex-shrink-0" />}
        bgColor="bg-danger-600"
        className="w-full max-w-md"
      >
        <p>{message}</p>
        <button
          className="ms-auto aspect-square rounded bg-white/20 p-0.5 hover:bg-white/30"
          onClick={() => setIsError(false)}
        >
          <Icons.XMark className="h-4 w-4" />
        </button>
      </Alert>
    ) : (
      ""
    );
  }

  if (isLoggedIn) {
    return <Navigate to="/profile" replace={true} />;
  }

  return (
    <div className="flex h-full flex-col items-center">
      <Header>Login</Header>

      <form
        onSubmit={handleSubmit}
        className="mb-4 mt-8 flex w-full max-w-md flex-auto flex-col justify-between gap-4 md:justify-start"
      >
        <div className="flex flex-col items-center justify-center gap-y-4">
          <InputIcon ref={usernameInput} type="text" placeholder="Username">
            <Icons.User className="h-5 w-5 text-text" />
          </InputIcon>
          <InputIcon ref={passwordInput} type="password" placeholder="Password">
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

Login.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setToken: PropTypes.func.isRequired,
};
