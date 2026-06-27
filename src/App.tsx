import { Routes, Route } from "react-router-dom";
import { Hero } from "@/components/ui/hero";
import { About } from "@/components/ui/about";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/sobre-mi" element={<About />} />
      </Routes>
    </main>
  );
}

export default App;
