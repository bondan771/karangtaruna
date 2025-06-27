import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Sidebar() {
  const { currentUser } = useAuth();
  const role = currentUser?.role || "anggota";

  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-xl font-semibold mb-4">Menu</h2>
      <ul className="space-y-2">
        <li>
          <Link
            to="/"
            className="block hover:bg-gray-700 px-2 py-1 rounded"
          >
            Beranda
          </Link>
        </li>
        <li>
          <Link
            to="/kegiatan"
            className="block hover:bg-gray-700 px-2 py-1 rounded"
          >
            Kegiatan
          </Link>
        </li>
        
        {/* Hanya tampilkan untuk non-anggota */}
        {role !== "anggota" && (
          <>
            <li>
              <Link
                to="/keuangan"
                className="block hover:bg-gray-700 px-2 py-1 rounded"
              >
                Keuangan
              </Link>
            </li>
            
            {/* Tambahan menu untuk admin/ketua */}
            {(role === "admin" || role === "ketua") && (
              <li>
                <Link
                  to="/anggota"
                  className="block hover:bg-gray-700 px-2 py-1 rounded"
                >
                  Manajemen Anggota
                </Link>
              </li>
            )}
          </>
        )}
      </ul>
    </aside>
  );
}