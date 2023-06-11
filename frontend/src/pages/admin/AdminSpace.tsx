/* COMPONENTS */
import { Route, Routes } from "react-router-dom";
import AdminPanel from "./workspace/AdminPanel";
import LandingPage from "../LandingPage";

const AdminSpace = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/society/*" element={<AdminPanel />} />
      </Routes>
    </div>
  );
};

export default AdminSpace;
