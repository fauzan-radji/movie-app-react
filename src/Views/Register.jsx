import { Link, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "../Components/Header";
import Icons from "../Components/Icons";
import InputIcon from "../Components/InputIcon";
import PrimaryButton from "../Components/PrimaryButton";
import { useReducer, useRef, useState } from "react";
import AlertContainer, {
  ACTIONS,
  alertReducer,
} from "../Components/AlertContainer";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const HTTP_CREATED = 201;

export default function Register({ isLoggedIn }) {
  const [alerts, dispatch] = useReducer(alertReducer, []);
  const nameInput = useRef();
  const emailInput = useRef();
  const usernameInput = useRef();
  const passwordInput = useRef();
  const confirmPasswordInput = useRef();
  const birthDateInput = useRef();
  const [isSending, setIsSending] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (isSending) return;

    setIsSending(true);
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
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode !== HTTP_CREATED) {
          if (Array.isArray(data.message)) {
            for (const message of data.message)
              dispatch({ type: ACTIONS.ERROR_PUSH, payload: message });
            return;
          }

          dispatch({ type: ACTIONS.ERROR_PUSH, payload: data.message });
          return;
        }

        dispatch({ type: ACTIONS.SUCCESS_PUSH, payload: data.message });
      })
      .catch((e) => dispatch({ type: ACTIONS.ERROR_PUSH, payload: e.message }))
      .finally(() => setIsSending(false));
  }

  if (isLoggedIn) return <Navigate to="/profile" replace={true} />;

  return (
    <div className="flex h-full flex-col items-center">
      <Header>Register</Header>

      <AlertContainer alerts={alerts} dispatch={dispatch} />

      {/* TODO: validate input on input change (onChange) */}
      {/* TODO: save input value to session storage */}
      <form
        onSubmit={handleSubmit}
        className="mt-4 flex w-full max-w-md flex-auto flex-col justify-between gap-4 pb-4 md:justify-start"
      >
        <div className="flex flex-col items-center justify-center gap-y-4">
          <InputIcon required ref={nameInput} type="text" placeholder="Name">
            <Icons.User className="h-5 w-5 text-text" />
          </InputIcon>
          <InputIcon required ref={emailInput} type="email" placeholder="Email">
            <Icons.Envelope className="h-5 w-5 text-text" />
          </InputIcon>
          <InputIcon
            required
            ref={usernameInput}
            type="text"
            placeholder="Username"
          >
            <Icons.User className="h-5 w-5 text-text" />
          </InputIcon>
          <InputIcon
            required
            ref={passwordInput}
            type="password"
            placeholder="Password"
          >
            <Icons.Lock className="h-5 w-5 text-text" />
          </InputIcon>
          <InputIcon
            required
            ref={confirmPasswordInput}
            type="password"
            placeholder="Confirm password"
          >
            <Icons.Lock className="h-5 w-5 text-text" />
          </InputIcon>
          <InputIcon
            required
            ref={birthDateInput}
            type="date"
            placeholder="Birth Date"
          >
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

          <PrimaryButton
            className={`w-full${
              isSending ? " cursor-not-allowed opacity-50" : ""
            }`}
          >
            Register{" "}
            {isSending ? (
              <Icons.Spinner className="h-5 w-5" />
            ) : (
              <Icons.Login className="-ms-1 h-5 w-5" />
            )}
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
}

Register.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};
