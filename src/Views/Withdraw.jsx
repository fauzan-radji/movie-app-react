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

export default function Withdraw({ isLoggedIn, token }) {
  const [alerts, dispatch] = useReducer(alertReducer, []);
  const input = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`${API_ENDPOINT}/balance/withdraw`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        withdrawal: +input.current.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode !== HTTP_CREATED) {
          dispatch({ type: ACTIONS.ERROR_PUSH, payload: data.message });
          return;
        }

        // FIXME
        if (data.messageWarning) {
          dispatch({
            type: ACTIONS.WARNING_PUSH,
            payload: data.messageWarning,
          });
        }

        dispatch({ type: ACTIONS.SUCCESS_PUSH, payload: data.message });
        input.current.value = "";
      })
      .catch((e) => dispatch({ type: ACTIONS.ERROR_PUSH, payload: e.message }));
  }

  if (!isLoggedIn) return <Navigate to="/login" replace={true} />;

  return (
    <div className="flex h-full flex-col">
      <Heading className="mb-4">Withdraw</Heading>

      <AlertContainer alerts={alerts} dispatch={dispatch} />

      <form
        onSubmit={handleSubmit}
        className="my-4 flex flex-auto flex-col justify-between"
      >
        <InputIcon ref={input} type="number" placeholder="Amount in IDR">
          <Icons.CreditCard className="h-4 w-4" />
        </InputIcon>

        <PrimaryButton className="w-full">
          <Icons.Withdraw className="mt-0.5 h-5 w-5" />
          Withdraw
        </PrimaryButton>
      </form>
    </div>
  );
}

Withdraw.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
};
