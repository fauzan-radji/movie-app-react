import {
  AlertContainer,
  CreditCard,
  Heading,
  Icons,
  InputIcon,
  PrimaryButton,
} from "../Components";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useReducer, useRef, useState } from "react";

import { ACTIONS as ALERT_ACTIONS } from "../Constants";
import { CreditCard as CreditCardSkeleton } from "../Skeletons";
import { alert as alertReducer } from "../Reducers";
import fetch from "../utils/fetch";
import { useAuth } from "../Context/Auth";
import { useFetch } from "../hooks";

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

export default function Withdraw() {
  const { isLoggedIn, token } = useAuth();
  const [alerts, alertsDispatch] = useReducer(alertReducer, []);
  const [errors, errorsDispatch] = useReducer(errorReducer, []);
  const navigate = useNavigate();
  const input = useRef();
  const [isSending, setIsSending] = useState(false);
  const {
    data: user,
    error,
    isLoading,
  } = useFetch(`${API_ENDPOINT}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    if (!error) return;
    alertsDispatch({ type: ALERT_ACTIONS.ERROR_PUSH, payload: error });
  }, [error]);

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
    fetch(`${API_ENDPOINT}/balance`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount: +input.current.value,
      }),
    })
      .then((data) => {
        navigate("/profile", {
          state: {
            successMessage: data.message,
          },
        });
        input.current.value = "";
      })
      .catch((e) =>
        alertsDispatch({ type: ALERT_ACTIONS.ERROR_PUSH, payload: e.message })
      )
      .finally(() => setIsSending(false));
  }

  if (!isLoggedIn) return <Navigate to="/login" replace={true} />;

  return (
    <div className="flex h-full flex-col">
      <Heading>Withdraw</Heading>

      <AlertContainer alerts={alerts} dispatch={alertsDispatch} />

      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-md flex-auto flex-col justify-between pb-4 md:pb-16"
      >
        <div className="flex flex-col gap-4">
          <InputIcon
            ref={input}
            type="number"
            min="1"
            max="500000"
            placeholder="Amount in IDR"
            required
            validate={(value) => {
              if (+value <= 0) return "Amount must be greater than 0";

              return "";
            }}
            onErrorChange={({ id, error }) => {
              if (error)
                errorsDispatch({
                  type: ERROR_ACTIONS.PUSH,
                  payload: { id, error },
                });
              else errorsDispatch({ type: ERROR_ACTIONS.CLEAR, payload: id });
            }}
          >
            <Icons.CreditCard className="h-4 w-4" />
          </InputIcon>

          {isLoading ? (
            <CreditCardSkeleton />
          ) : (
            <CreditCard balance={user.balance} username={user.username} />
          )}
        </div>

        <PrimaryButton
          disabled={isSending || isLoading}
          className="mt-4 w-full"
        >
          {isSending ? (
            <Icons.Spinner className="h-5 w-5" />
          ) : (
            <Icons.Withdraw className="h-5 w-5" />
          )}{" "}
          Withdraw
        </PrimaryButton>
      </form>
    </div>
  );
}
