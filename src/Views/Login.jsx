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
const HTTP_OK = 200;

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

export default function Login({ isLoggedIn, setToken }) {
  const [alerts, alertsDispatch] = useReducer(alertReducer, []);
  const [errors, errorsDispatch] = useReducer(errorReducer, []);
  const usernameInput = useRef();
  const passwordInput = useRef();
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
    fetch(`${API_ENDPOINT}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: usernameInput.current.value,
        hash: passwordInput.current.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode !== HTTP_OK) {
          alertsDispatch({
            type: ALERT_ACTIONS.ERROR_PUSH,
            payload: data.message,
          });
          return;
        }

        setToken(data.token);
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
      <Header>Login</Header>

      <AlertContainer alerts={alerts} dispatch={alertsDispatch} />

      <form
        onSubmit={handleSubmit}
        className="mt-4 flex w-full max-w-md flex-auto flex-col justify-between gap-4 pb-4 md:justify-start"
      >
        <div className="flex flex-col items-center justify-center gap-y-4">
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
            <Icons.User className="h-4 w-4" />
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
        </div>

        <div className="flex flex-col items-center justify-center gap-y-4 md:flex-col-reverse">
          <p className="text-neutralContrast/80">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-accent">
              Register
            </Link>
          </p>

          <PrimaryButton
            className={`w-full${
              isSending ? " cursor-not-allowed opacity-50" : ""
            }`}
          >
            Login{" "}
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

Login.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setToken: PropTypes.func.isRequired,
};
