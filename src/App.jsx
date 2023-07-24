import { Route, Routes } from "react-router-dom";
import { Navbar } from "./Components";
import Views from "./Views";

export default function App() {
  return (
    <div className="flex h-[100dvh] flex-col-reverse bg-neutral text-neutralContrast md:flex-col">
      <Navbar />

      <main className="no-scrollbar container mx-auto flex-auto overflow-auto px-6 pt-4">
        <Routes>
          <Route path="/">
            <Route index element={<Views.Home />} />
            <Route path="movies/:movieId">
              <Route index element={<Views.Movie />} />
              <Route element={<Views.BookTicket />} path="book" />
            </Route>
            <Route path="profile">
              <Route index element={<Views.Profile />} />
              <Route path="topup" element={<Views.TopUp />} />
              <Route path="withdraw" element={<Views.Withdraw />} />
            </Route>
            <Route path="login" element={<Views.Login />} />
            <Route path="register" element={<Views.Register />} />
            <Route path="tickets/:ticketId" element={<Views.Ticket />} />
            <Route path="transactions">
              <Route index element={<Views.Transactions />} />
              <Route path=":transactionId" element={<Views.Transaction />} />
            </Route>
          </Route>
        </Routes>
      </main>
    </div>
  );
}
