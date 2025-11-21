import { Routes, Route, Router } from "react-router";
import Tech from "./pages/Tech";
import Home from "./pages/Home";
import Houses from "./pages/Houses";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ConfirmEmail from "./pages/ConfirmEmail";
import Prudoct from "./pages/Prudoct";
function App() {
  const user = {
    photo: "/client/public/clothing.png",
    name: "afdsasfsdf",
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prudocts/tech/" element={<Tech />} />
        <Route path="/prudocts/houses/" element={<Houses />} />
        <Route path="/prudocts/:id" element={<Prudoct />} />
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/register" element={<Register />} />
        <Route path="auth/confirm" user={user} element={<ConfirmEmail />} />
      </Routes>
    </>
  );
}

export default App;
