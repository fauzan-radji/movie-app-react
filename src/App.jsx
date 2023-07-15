import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import View from "./Views/Views";

export default function App() {
  return (
    <div className="flex h-[100dvh] flex-col-reverse bg-neutral text-neutralContrast md:flex-col">
      <Navbar />

      <main className="no-scrollbar container mx-auto flex-auto overflow-auto px-6 pt-4">
        <Routes>
          <Route path="/">
            <Route index element={<View.Home />} />
            {/* FIXME: use /movies instead of /movie */}
            <Route path="movie/:movieId">
              <Route index element={<View.Movie />} />
              <Route element={<View.BookTicket />} path="book" />
            </Route>
            <Route path="profile">
              <Route index element={<View.Profile />} />
              <Route path="topup" element={<View.TopUp />} />
              <Route path="withdraw" element={<View.Withdraw />} />
            </Route>
            <Route path="login" element={<View.Login />} />
            <Route path="register" element={<View.Register />} />
            <Route path="tickets/:ticketId" element={<View.Ticket />} />
            <Route path="transactions">
              <Route index element={<View.Transactions />} />
              <Route path=":transactionId" element={<View.Transaction />} />
            </Route>
          </Route>
        </Routes>
      </main>
    </div>
  );
}
