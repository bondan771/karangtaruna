import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext"; // Import useAuth
import { db } from "../../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import KegiatanForm from "./KegiatanForm";

export default function KegiatanList() {
  const { role } = useAuth(); // Dapatkan role dari AuthContext
  const [kegiatan, setKegiatan] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchKegiatan = async () => {
    setLoading(true);
    const snapshot = await getDocs(collection(db, "kegiatan"));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setKegiatan(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "kegiatan", id));
    fetchKegiatan();
  };

  useEffect(() => {
    fetchKegiatan();
  }, []);

  return (
    <div className="space-y-4">
      {/* Sembunyikan form untuk anggota */}
      {role !== "anggota" && (
        <KegiatanForm 
          onSaved={fetchKegiatan} 
          selected={selected} 
          clearSelected={() => setSelected(null)} 
        />
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2">
          {kegiatan.map(item => (
            <li key={item.id} className="border p-2 rounded">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold">{item.judul}</h3>
                  <p>{item.deskripsi}</p>
                  <small>{new Date(item.tanggal?.seconds * 1000).toLocaleDateString()}</small>
                </div>
                
                {/* Hanya tampilkan tombol untuk non-anggota */}
                {role !== "anggota" && (
                  <div className="space-x-2">
                    <button
                      onClick={() => setSelected(item)}
                      className="text-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500"
                    >
                      Hapus
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}