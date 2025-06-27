import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import KegiatanPage from "./pages/KegiatanPage";
import KeuanganPage from "./pages/KeuanganPage";
import AnggotaPage from "./pages/AnggotaPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="kegiatan" element={<KegiatanPage />} />
            <Route path="keuangan" element={<KeuanganPage />} />
            <Route path="anggota" element={<AnggotaPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;