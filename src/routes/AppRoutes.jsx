import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Home from "../components/layout/Home";
import KegiatanList from "../components/kegiatan/KegiatanList";
import KeuanganList from "../components/keuangan/KeuanganList";
import { useAuth } from "../contexts/AuthContext";

const AppRoutes = () => {
  const { currentUser } = useAuth();

  return (
    <Routes>
      {!currentUser ? (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/kegiatan" element={<KegiatanList />} />
          <Route path="/keuangan" element={<KeuanganList />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
