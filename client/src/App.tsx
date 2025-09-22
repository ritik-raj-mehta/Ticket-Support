import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import TicketForm from "./pages/TicketForm";
import TicketDetail from "./pages/TicketDetail";
import { useEffect } from "react";
import { useTheme } from "./store/Theme";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
  const { themeMode } = useTheme();

  useEffect(() => {
    const html = document.querySelector("html");
    if (!html) return;

    html.classList.remove("light", "dark");
    html.classList.add(themeMode);
  }, [themeMode]);
  return (
    <div className="mx-auto max-w-[1520px]">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<TicketForm />} />
        <Route path="/ticket/:id" element={<TicketDetail />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;

