import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import { Home } from "./pages/Home";
import { Technology } from "./pages/Technology";
import { ScrollToHash } from "./components/ScrollToHash";
import { Achievement } from "./pages/Achievements";

function App() {
  return (
    <BrowserRouter>

      <ScrollToHash />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/achievements" element={<Achievement />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;