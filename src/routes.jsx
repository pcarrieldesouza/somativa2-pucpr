import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
      <Route path="/principal" element={<Home />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
