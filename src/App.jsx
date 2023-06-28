import Navbar from "./Components/Navbar";
import Home from "./Views/Home";

function App() {
  return (
    <div className="min-h-[100dvh] bg-background text-text">
      <Navbar />

      <main>
        <Home />
      </main>
    </div>
  );
}

export default App;
