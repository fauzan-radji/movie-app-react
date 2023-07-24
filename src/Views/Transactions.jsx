import { useEffect, useReducer } from "react";
import { Navigate } from "react-router-dom";
import { AlertContainer, Heading, TransactionCard } from "../Components";
import { TransactionCard as TransactionCardSkeleton } from "../Skeletons";
import { ACTIONS } from "../Constants";
import { alert as alertReducer } from "../Reducers";
import { useFetch } from "../hooks";
import { useAuth } from "../Context/Auth";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export default function Transactions() {
  const { isLoggedIn, token } = useAuth();
  const [alerts, dispatch] = useReducer(alertReducer, []);
  const {
    data: transactions,
    error,
    isLoading,
  } = useFetch(`${API_ENDPOINT}/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    if (!error) return;
    dispatch({ type: ACTIONS.ERROR_PUSH, payload: error.message });
  }, [error]);

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return (
    <div className="flex flex-col pb-4">
      <Heading>My Orders</Heading>

      <AlertContainer className="mt-4" alerts={alerts} dispatch={dispatch} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array(4)
              .fill()
              .map((_, index) => <TransactionCardSkeleton key={index + 1} />)
          : transactions.map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
      </div>
    </div>
  );
}
