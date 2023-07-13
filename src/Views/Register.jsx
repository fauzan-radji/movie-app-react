import { Link, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "../Components/Header";
import Icons from "../Components/Icons";
import InputIcon from "../Components/InputIcon";
import PrimaryButton from "../Components/PrimaryButton";
import { useReducer, useRef, useState } from "react";
import AlertContainer, {
  ACTIONS as ALERT_ACTIONS,
  alertReducer,
} from "../Components/AlertContainer";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const HTTP_CREATED = 201;

const ERROR_ACTIONS = {
  PUSH: "push",
  CLEAR: "clear",
};

function errorReducer(state, action) {
  switch (action.type) {
    case ERROR_ACTIONS.PUSH:
      return [...state, action.payload];
    case ERROR_ACTIONS.CLEAR:
      return state.filter((error) => error.id !== action.payload);
    default:
      state;
  }
}

export default function Register({ isLoggedIn }) {
  const [alerts, alertsDispatch] = useReducer(alertReducer, []);
  const [errors, errorsDispatch] = useReducer(errorReducer, []);
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
    if (errors.length > 0) {
      errors
        .reverse()
        .forEach(({ error }) =>
          alertsDispatch({ type: ALERT_ACTIONS.ERROR_PUSH, payload: error })
        );
      return;
    }

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
              alertsDispatch({
                type: ALERT_ACTIONS.ERROR_PUSH,
                payload: message,
              });
            return;
          }

          alertsDispatch({
            type: ALERT_ACTIONS.ERROR_PUSH,
            payload: data.message,
          });
          return;
        }

        alertsDispatch({
          type: ALERT_ACTIONS.SUCCESS_PUSH,
          payload: data.message,
        });
      })
      .catch((e) =>
        alertsDispatch({ type: ALERT_ACTIONS.ERROR_PUSH, payload: e.message })
      )
      .finally(() => setIsSending(false));
  }

  if (isLoggedIn) return <Navigate to="/profile" replace={true} />;

  return (
    <div className="flex h-full flex-col items-center">
      <Header>Register</Header>

      <AlertContainer alerts={alerts} dispatch={alertsDispatch} />

      {/* TODO: save input value to session storage */}
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-auto flex-col justify-between gap-4 pb-4 md:justify-start"
      >
        <div className="flex flex-col items-center justify-center gap-y-4">
          <InputIcon
            required
            ref={nameInput}
            type="text"
            placeholder="Name"
            validate={(value) => ({
              isError: value.length < 3,
              message: "Name must be at least 3 characters long",
            })}
            onErrorChange={({ id, error }) => {
              if (error)
                errorsDispatch({
                  type: ERROR_ACTIONS.PUSH,
                  payload: { id, error },
                });
              else errorsDispatch({ type: ERROR_ACTIONS.CLEAR, payload: id });
            }}
          >
            <Icons.User className="h-4 w-4" />
          </InputIcon>
          <InputIcon
            required
            ref={emailInput}
            type="email"
            placeholder="Email"
            validate={(value) => ({
              isError: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
              message: "Email must be valid",
            })}
            onErrorChange={({ id, error }) => {
              if (error)
                errorsDispatch({
                  type: ERROR_ACTIONS.PUSH,
                  payload: { id, error },
                });
              else errorsDispatch({ type: ERROR_ACTIONS.CLEAR, payload: id });
            }}
          >
            <Icons.Envelope className="h-4 w-4" />
          </InputIcon>
          {/* TODO: fix username validation: username only can contains alphanumeric, underscore and dot */}
          <InputIcon
            required
            ref={usernameInput}
            type="text"
            placeholder="Username"
            validate={(value) => ({
              isError: value.length < 3,
              message: "Username must be at least 3 characters long",
            })}
            onErrorChange={({ id, error }) => {
              if (error)
                errorsDispatch({
                  type: ERROR_ACTIONS.PUSH,
                  payload: { id, error },
                });
              else errorsDispatch({ type: ERROR_ACTIONS.CLEAR, payload: id });
            }}
          >
            <Icons.AtSymbol className="h-4 w-4" />
          </InputIcon>
          {/* TODO: add show/hide password feature */}
          <InputIcon
            required
            ref={passwordInput}
            type="password"
            placeholder="Password"
            validate={(value) => ({
              isError: value.length < 8,
              message: "Password must be at least 8 characters long",
            })}
            onErrorChange={({ id, error }) => {
              if (error)
                errorsDispatch({
                  type: ERROR_ACTIONS.PUSH,
                  payload: { id, error },
                });
              else errorsDispatch({ type: ERROR_ACTIONS.CLEAR, payload: id });
            }}
          >
            <Icons.Lock className="h-4 w-4" />
          </InputIcon>
          {/* TODO: add show/hide password feature */}
          <InputIcon
            required
            ref={confirmPasswordInput}
            type="password"
            placeholder="Confirm password"
            validate={(value) => ({
              isError: passwordInput.current.value !== value,
              message: "Passwords do not match",
            })}
            onErrorChange={({ id, error }) => {
              if (error)
                errorsDispatch({
                  type: ERROR_ACTIONS.PUSH,
                  payload: { id, error },
                });
              else errorsDispatch({ type: ERROR_ACTIONS.CLEAR, payload: id });
            }}
          >
            <Icons.Lock className="h-4 w-4" />
          </InputIcon>
          <InputIcon
            required
            ref={birthDateInput}
            type="date"
            placeholder="Birth Date"
            max={new Date().toISOString().split("T")[0]}
            validate={(value) => ({
              isError: new Date(value) > new Date(),
              message: "Birth date must be in the past",
            })}
            onErrorChange={({ id, error }) => {
              if (error)
                errorsDispatch({
                  type: ERROR_ACTIONS.PUSH,
                  payload: { id, error },
                });
              else errorsDispatch({ type: ERROR_ACTIONS.CLEAR, payload: id });
            }}
          >
            <Icons.Calendar className="h-4 w-4" />
          </InputIcon>
        </div>

        <div className="flex flex-col items-center justify-center gap-y-4 md:flex-col-reverse">
          <p className="text-neutralContrast/80">
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
