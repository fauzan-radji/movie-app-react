import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import View from "./Views/View";

function App() {
  return (
    <div className="flex h-[100dvh] flex-col-reverse bg-background text-text md:flex-col">
      <Navbar />

      <main className="no-scrollbar container mx-auto flex-auto overflow-auto px-6 pt-4">
        <Routes>
          <Route path="/">
            <Route index element={<View.Home />} />
            <Route path="movie/:movieId">
              <Route index element={<View.Movie />} />
              <Route element={<View.BookTicket />} path="book" />
            </Route>
            <Route path="login" element={<View.Login />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
