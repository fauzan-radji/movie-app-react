import { ACTIONS as ALERT_ACTIONS, HTTP } from "../Constants";
import {
  AlertContainer,
  CreditCard,
  Heading,
  Icons,
  InputIcon,
  PrimaryButton,
} from "../Components";
import { useEffect, useReducer, useRef, useState } from "react";

import { CreditCard as CreditCardSkeleton } from "../Skeletons";
import { Navigate } from "react-router-dom";
import { alert as alertReducer } from "../Reducers";
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

export default function TopUp() {
  const { isLoggedIn, token } = useAuth();
  const [alerts, alertsDispatch] = useReducer(alertReducer, []);
  const [errors, errorsDispatch] = useReducer(errorReducer, []);
  const input = useRef();
  const [isSending, setIsSending] = useState(false);
  const {
    data: balance,
    error,
    isLoading,
  } = useFetch(`${API_ENDPOINT}/balance`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    if (!error) return;
    alertsDispatch({ type: ALERT_ACTIONS.ERROR_PUSH, payload: error.message });
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        balance: +input.current.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode !== HTTP.CREATED) {
          alertsDispatch({
            type: ALERT_ACTIONS.ERROR_PUSH,
            payload: data.message,
          });
          return;
        }

        // TODO: update balance to new balance after top up
        alertsDispatch({
          type: ALERT_ACTIONS.SUCCESS_PUSH,
          payload: data.message,
        });
        input.current.value = "";
        balance.balance = +data.data.balance;
      })
      .catch((e) =>
        alertsDispatch({ type: ALERT_ACTIONS.ERROR_PUSH, payload: e.message })
      )
      .finally(() => setIsSending(false));
  }

  if (!isLoggedIn) return <Navigate to="/login" replace={true} />;

  return (
    <div className="flex h-full flex-col">
      <Heading>Top Up</Heading>

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
            <CreditCard
              balance={balance.balance}
              username={balance.user.username}
            />
          )}
        </div>

        <PrimaryButton
          disabled={isSending || isLoading}
          className="mt-4 w-full"
        >
          {isSending ? (
            <Icons.Spinner className="h-5 w-5" />
          ) : (
            <Icons.TopUp className="mt-1 h-5 w-5" />
          )}{" "}
          Top Up
        </PrimaryButton>
      </form>
    </div>
  );
}
