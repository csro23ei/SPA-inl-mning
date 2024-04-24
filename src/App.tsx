import { useEffect, useState } from "react";
import "./App.css";
import Start from "./Components/Pages/Start";
import Booking from "./Components/Pages/Booking";
import Contact from "./Components/Pages/Contact";
import Taskbar from "./Components/NavBar";

function App() {
  const [page, setPage] = useState<string>("");

  useEffect(() => {
    let pageUrl = page;

    if (!pageUrl) {
      const queryParams = new URLSearchParams(window.location.search);
      const getUrl = queryParams.get("page");

      if (getUrl) {
        pageUrl = getUrl;
        setPage(getUrl);
      } else {
        pageUrl = "start";
      }
    }

    window.history.pushState(null, "", "?page=" + pageUrl);
  }, [page]);

  return (
    <>
      <div >
        <h1 style={{ textAlign: "center" }}>Välkommen till DA Spa</h1>
        <Taskbar setPage={setPage} />
        {{
          start: <Start />,
          booking: <Booking />,
          contact: <Contact />,
        }[page] || <Start />}
      </div>
    </>
  );
}

export default App;