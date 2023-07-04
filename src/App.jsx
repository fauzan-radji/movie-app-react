import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import View from "./Views/View";
import { useSessionStorage } from "usehooks-ts";

export default function App() {
  const [token, setToken] = useSessionStorage("token", "");
  const isLoggedIn = !!token;

  return (
    <div className="flex h-[100dvh] flex-col-reverse bg-background text-text md:flex-col">
      <Navbar isLoggedIn={isLoggedIn} />

      <main className="no-scrollbar container mx-auto flex-auto overflow-auto px-6 pt-4">
        <Routes>
          <Route path="/">
            <Route index element={<View.Home />} />
            <Route path="movie/:movieId">
              <Route index element={<View.Movie />} />
              <Route
                element={
                  <View.BookTicket isLoggedIn={isLoggedIn} token={token} />
                }
                path="book"
              />
            </Route>
            <Route
              path="profile"
              element={
                <View.Profile
                  isLoggedIn={isLoggedIn}
                  token={token}
                  setToken={setToken}
                />
              }
            />
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
              path="tickets"
              element={<View.Tickets isLoggedIn={isLoggedIn} />}
            />
          </Route>
        </Routes>
      </main>
    </div>
  );
}
