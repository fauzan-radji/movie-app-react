import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import View from "./Views/Views";
import { useSessionStorage } from "usehooks-ts";

export default function App() {
  const [token, setToken] = useSessionStorage("token", "");
  const isLoggedIn = !!token;

  return (
    <div className="flex h-[100dvh] flex-col-reverse bg-neutral text-neutralContrast md:flex-col">
      <Navbar isLoggedIn={isLoggedIn} />

      <main className="no-scrollbar container mx-auto flex-auto overflow-auto px-6 pt-4">
        <Routes>
          <Route path="/">
            <Route index element={<View.Home />} />
            {/* FIXME: use /movies instead of /movie */}
            <Route path="movie/:movieId">
              <Route index element={<View.Movie />} />
              <Route
                element={
                  <View.BookTicket isLoggedIn={isLoggedIn} token={token} />
                }
                path="book"
              />
            </Route>
            <Route path="profile">
              <Route
                index
                element={
                  <View.Profile
                    isLoggedIn={isLoggedIn}
                    token={token}
                    setToken={setToken}
                  />
                }
              />
              <Route
                path="topup"
                element={<View.TopUp isLoggedIn={isLoggedIn} token={token} />}
              />
              <Route
                path="withdraw"
                element={
                  <View.Withdraw isLoggedIn={isLoggedIn} token={token} />
                }
              />
            </Route>
            <Route
              path="login"
              element={
                <View.Login isLoggedIn={isLoggedIn} setToken={setToken} />
              }
            />
            <Route
              path="register"
              element={<View.Register isLoggedIn={isLoggedIn} />}
            />
            <Route
              path="tickets/:ticketId"
              element={<View.Ticket isLoggedIn={isLoggedIn} token={token} />}
            />
            <Route path="transactions">
              <Route
                index
                element={
                  <View.Transactions isLoggedIn={isLoggedIn} token={token} />
                }
              />
              <Route
                path=":transactionId"
                element={
                  <View.Transaction isLoggedIn={isLoggedIn} token={token} />
                }
              />
            </Route>
          </Route>
        </Routes>
      </main>
    </div>
  );
}
