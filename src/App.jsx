import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Sidebar from "./pages/product.jsx";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let Description = "";

    switch (pathname) {
      case "/":
        title = "";
        Description = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (Description) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = Description;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Sidebar />} />
    </Routes>
  );
}
export default App;
