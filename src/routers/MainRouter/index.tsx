import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { NotFound } from "../../pages/NotFound";
import { Home } from "../../pages/home";
import { AboutPomodoro } from "../../pages/AboutPomodoro";
import { useEffect } from "react";
import { History } from "../../pages/History";
import { Settings } from "../../pages/Settings";
import { Star } from "lucide-react";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

export function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-pomodoro/" element={<AboutPomodoro />} />
        <Route path="/settings/" element={<Settings />} />
        <Route path="/history/" element={<History />} />
        <Route path="*" element={<NotFound />} />
        <Route path="https://flexbeesistemas.com.br/" element={<Star />} />
      </Routes>
      <ScrollToTop />
    </BrowserRouter>
  );
}
