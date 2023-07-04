import PropTypes from "prop-types";
import Heading from "../Components/Heading";
import Icons from "../Components/Icons";
import InputIcon from "../Components/InputIcon";
import PrimaryButton from "../Components/PrimaryButton";
import { Navigate } from "react-router-dom";
import { useRef, useState } from "react";
import SuccessAlert from "../Components/SuccessAlert";
import ErrorAlert from "../Components/ErrorAlert";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export default function TopUp({ isLoggedIn, token }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
        if (data.success) {
          setSuccess(data.message);
          input.current.value = "";
        }
        if (data.error) setError(data.error);
      })
      .catch((e) => {
        setError(e.message);
      });
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <div className="flex h-full flex-col">
      <Heading className="mb-4">Top Up</Heading>

      {success ? (
        <SuccessAlert className="w-full max-w-md">
          <p>{success} </p>
          <button
            className="ms-auto aspect-square rounded bg-white/20 p-0.5 hover:bg-white/30"
            onClick={() => setSuccess("")}
          >
            <Icons.XMark className="h-4 w-4" />
          </button>
        </SuccessAlert>
      ) : (
        ""
      )}

      {error ? (
        <ErrorAlert className="w-full max-w-md">
          <p>{error}</p>
          <button
            className="ms-auto aspect-square rounded bg-white/20 p-0.5 hover:bg-white/30"
            onClick={() => setError("")}
          >
            <Icons.XMark className="h-4 w-4" />
          </button>
        </ErrorAlert>
      ) : (
        ""
      )}

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
