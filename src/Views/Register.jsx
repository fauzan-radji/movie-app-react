import { ACTIONS as ALERT_ACTIONS, HTTP } from "../Constants";
import {
  AlertContainer,
  Header,
  Icons,
  InputIcon,
  PrimaryButton,
} from "../Components";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useCallback, useReducer, useRef, useState } from "react";

import { alert as alertReducer } from "../Reducers";
import { useAuth } from "../Context/Auth";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

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

export default function Register() {
  const { isLoggedIn } = useAuth();
  const [alerts, alertsDispatch] = useReducer(alertReducer, []);
  const [errors, errorsDispatch] = useReducer(errorReducer, []);
  const nameInput = useRef();
  const emailInput = useRef();
  const usernameInput = useRef();
  const passwordInput = useRef();
  const confirmPasswordInput = useRef();
  const birthDateInput = useRef();
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();

  const onInputError = useCallback(({ id, error }) => {
    if (error)
      errorsDispatch({
        type: ERROR_ACTIONS.PUSH,
        payload: { id, error },
      });
    else errorsDispatch({ type: ERROR_ACTIONS.CLEAR, payload: id });
  }, []);

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
    fetch(`${API_ENDPOINT}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameInput.current.value,
        email: emailInput.current.value,
        username: usernameInput.current.value,
        password: passwordInput.current.value,
        birthDate: new Date(birthDateInput.current.value),
      }),
    })
      .then((res) => {
        if (res.status !== HTTP.OK) {
          throw new Error(res.statusText);
        }

        return res.json();
      })
      .then((data) => {
        // alertsDispatch({
        //   type: ALERT_ACTIONS.SUCCESS_PUSH,
        //   payload: data.message,
        // });

        navigate("/login", {
          state: {
            successMessage: data.message,
          },
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
            validate={(value) => {
              if (!/^[a-zA-Z\s]+$/.test(value))
                "Name must only contains letters";

              if (value.length < 3)
                return "Name must be at least 3 characters long";

              return "";
            }}
            onErrorChange={onInputError}
          >
            <Icons.User className="h-4 w-4" />
          </InputIcon>
          <InputIcon
            required
            ref={emailInput}
            type="email"
            placeholder="Email"
            validate={(value) => {
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                return "Email must be valid";

              return "";
            }}
            onErrorChange={onInputError}
          >
            <Icons.Envelope className="h-4 w-4" />
          </InputIcon>
          <InputIcon
            required
            ref={usernameInput}
            type="text"
            placeholder="Username"
            validate={(value) => {
              if (!/^[a-zA-Z0-9_.]+$/.test(value))
                return "Username only can contains alphanumeric, underscore and dot";

              if (value.length < 3)
                return "Username must be at least 3 characters long";

              return "";
            }}
            onErrorChange={onInputError}
          >
            <Icons.AtSymbol className="h-4 w-4" />
          </InputIcon>
          {/* TODO: add show/hide password feature */}
          <InputIcon
            required
            ref={passwordInput}
            type="password"
            placeholder="Password"
            validate={(value) => {
              if (!/\w+/.test(value))
                return "Password must contains at least one alphanumeric character";

              if (value.length < 8)
                return "Password must be at least 8 characters long";

              return "";
            }}
            onErrorChange={onInputError}
          >
            <Icons.Lock className="h-4 w-4" />
          </InputIcon>
          {/* TODO: add show/hide password feature */}
          <InputIcon
            required
            ref={confirmPasswordInput}
            type="password"
            placeholder="Confirm password"
            validate={(value) => {
              if (passwordInput.current.value !== value)
                return "Passwords do not match";

              return "";
            }}
            onErrorChange={onInputError}
          >
            <Icons.Lock className="h-4 w-4" />
          </InputIcon>
          <InputIcon
            required
            ref={birthDateInput}
            type="date"
            placeholder="Birth Date"
            max={new Date().toISOString().split("T")[0]}
            validate={(value) => {
              if (new Date(value) > new Date())
                return "Birth date must be in the past";

              return "";
            }}
            onErrorChange={onInputError}
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
