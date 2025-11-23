import { Routes, Route, Router } from "react-router";
import Tech from "./pages/Tech";
import Home from "./pages/Home";
import Houses from "./pages/Homes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ConfirmEmail from "./pages/ConfirmEmail";
import Prudoct from "./pages/Prudoct";
import AddPrudoct from "./pages/AddPrudoct";
import Kitchen from "./pages/Kitchen";
function App() {
  const user = {
    photo: "/client/public/clothing.png",
    name: "user",
  };
  return (
    <>
      <Routes>
        {/* Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/prudocts/tech/" element={<Tech />} />
        <Route path="/prudocts/homes/" element={<Houses />} />
        <Route path="/prudocts/kitchen/" element={<Kitchen />} />
        {/* Speciefic */}
        <Route path="/prudocts/:id" element={<Prudoct />} />
        {/* Auth */}
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/register" element={<Register />} />
        <Route path="auth/confirm" user={user} element={<ConfirmEmail />} />
        {/* For User */}
        <Route path={`${user.name}/add`} element={<AddPrudoct />} />
      </Routes>
    </>
  );
}

export default App;
