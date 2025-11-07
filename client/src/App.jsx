import Header from "./components/Header";
import { Routes, Route, Router } from "react-router";
import Home from "./pages/Home";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
