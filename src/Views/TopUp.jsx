import PropTypes from "prop-types";
import Heading from "../Components/Heading";
import Icons from "../Components/Icons";
import InputIcon from "../Components/InputIcon";
import PrimaryButton from "../Components/PrimaryButton";
import { Navigate } from "react-router-dom";
import { useReducer, useRef } from "react";
import AlertContainer, {
  ACTIONS,
  alertReducer,
} from "../Components/AlertContainer";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const HTTP_CREATED = 201;

export default function TopUp({ isLoggedIn, token }) {
  const [alerts, dispatch] = useReducer(alertReducer, []);
  const input = useRef();

  function handleSubmit(e) {
    e.preventDefault();

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
        if (data.statusCode !== HTTP_CREATED) {
          dispatch({ type: ACTIONS.ERROR_PUSH, payload: data.message });
          return;
        }

        dispatch({ type: ACTIONS.SUCCESS_PUSH, payload: data.message });
        input.current.value = "";
      })
      .catch((e) => dispatch({ type: ACTIONS.ERROR_PUSH, payload: e.message }));
  }

  if (!isLoggedIn) return <Navigate to="/login" replace={true} />;

  return (
    <div className="flex h-full flex-col">
      <Heading className="mb-4">Top Up</Heading>

      <AlertContainer alerts={alerts} dispatch={dispatch} />

      <form
        onSubmit={handleSubmit}
        className="my-4 flex flex-auto flex-col justify-between"
      >
        <InputIcon ref={input} type="number" placeholder="Amount in IDR">
          <Icons.CreditCard className="h-4 w-4" />
        </InputIcon>

        <PrimaryButton className="w-full">
          <Icons.TopUp className="mt-0.5 h-5 w-5" />
          Top Up
        </PrimaryButton>
      </form>
    </div>
  );
}

TopUp.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
};
