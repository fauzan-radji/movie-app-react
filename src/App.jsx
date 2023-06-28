import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import View from "./Views/View";

function App() {
  return (
    <div className="min-h-[100dvh] bg-background text-text">
      <Navbar />

      <main className="container mx-auto px-6">
        <Routes>
          <Route element={<View.Home />} path="/" />
          <Route element={<View.Movie />} path="/movie/:movieId"></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
