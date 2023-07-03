import { Link, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "../Components/Header";
import Icons from "../Components/Icons";
import InputIcon from "../Components/InputIcon";
import PrimaryButton from "../Components/PrimaryButton";
import { useRef, useState } from "react";
import ErrorAlert from "../Components/ErrorAlert";
import SuccessAlert from "../Components/SuccessAlert";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export default function Register({ isLoggedIn }) {
  const nameInput = useRef();
  const emailInput = useRef();
  const usernameInput = useRef();
  const passwordInput = useRef();
  const confirmPasswordInput = useRef();
  const birthDateInput = useRef();

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`${API_ENDPOINT}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameInput.current.value,
        email: emailInput.current.value,
        username: usernameInput.current.value,
        hash: passwordInput.current.value,
        birth: birthDateInput.current.value,
        confirmPassword: confirmPasswordInput.current.value,
      }),
    })
      .then((res) => {
        // TODO: set error when response.status is not 200
        return res.json();
      })
      .then((data) => {
        if (data.success) setIsSuccess(true);
        if (data.error) setIsError(true);
        setMessage(data.message);
      })
      .catch((e) => {
        setIsError(true);
        setMessage(e.message);
      });
  }

  if (isLoggedIn) {
    return <Navigate to="/profile" replace={true} />;
  }

  return (
    <div className="flex h-full flex-col items-center">
      <Header>Register</Header>

      {isSuccess ? (
        <SuccessAlert className="w-full max-w-md">
          <p>
            {message}{" "}
            <Link to="/login" className="underline">
              Go to login page
            </Link>
          </p>
          <button
            className="ms-auto aspect-square rounded bg-white/20 p-0.5 hover:bg-white/30"
            onClick={() => setIsSuccess(false)}
          >
            <Icons.XMark className="h-4 w-4" />
          </button>
        </SuccessAlert>
      ) : isError ? (
        <ErrorAlert className="w-full max-w-md">
          <p>{message}</p>
          <button
            className="ms-auto aspect-square rounded bg-white/20 p-0.5 hover:bg-white/30"
            onClick={() => setIsError(false)}
          >
            <Icons.XMark className="h-4 w-4" />
          </button>
        </ErrorAlert>
      ) : (
        ""
      )}

      {/* TODO: validate input on input change (onChange) */}
      {/* TODO: save input value to session storage */}
      <form
        onSubmit={handleSubmit}
        className="mb-4 mt-8 flex w-full max-w-md flex-auto flex-col justify-between gap-4 md:justify-start"
      >
        <div className="flex flex-col items-center justify-center gap-y-4">
          <InputIcon ref={nameInput} type="text" placeholder="Name">
            <Icons.User className="h-5 w-5 text-text" />
          </InputIcon>
          <InputIcon ref={emailInput} type="email" placeholder="Email">
            <Icons.Envelope className="h-5 w-5 text-text" />
          </InputIcon>
          <InputIcon ref={usernameInput} type="text" placeholder="Username">
            <Icons.User className="h-5 w-5 text-text" />
          </InputIcon>
          <InputIcon ref={passwordInput} type="password" placeholder="Password">
            <Icons.Lock className="h-5 w-5 text-text" />
          </InputIcon>
          <InputIcon
            ref={confirmPasswordInput}
            type="password"
            placeholder="Confirm password"
          >
            <Icons.Lock className="h-5 w-5 text-text" />
          </InputIcon>
          <InputIcon ref={birthDateInput} type="date" placeholder="Birth Date">
            <Icons.Calendar className="h-5 w-5 text-text" />
          </InputIcon>
        </div>

        <div className="flex flex-col items-center justify-center gap-y-4 md:flex-col-reverse">
          <p className="text-text/80">
            Already have an account?{" "}
            <Link to="/login" className="text-accent">
              Login
            </Link>
          </p>

          {/* TODO: provide feedback that data is being sent */}
          <PrimaryButton className="w-full">
            Register <Icons.Login className="h-5 w-5" />
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
}

Register.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};
