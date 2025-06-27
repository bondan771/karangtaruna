import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext"; // Import useAuth
import { db } from "../../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import KeuanganForm from "./KeuanganForm";

export default function KeuanganList() {
  const { role } = useAuth(); // Dapatkan role dari AuthContext
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const snapshot = await getDocs(collection(db, "keuangan"));
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setData(items);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "keuangan", id));
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-4">
      {/* Sembunyikan form untuk anggota */}
      {role !== "anggota" && (
        <KeuanganForm 
          onSaved={fetchData} 
          selected={selected} 
          clearSelected={() => setSelected(null)} 
        />
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2">
          {data.map(item => (
            <li key={item.id} className="border p-2 rounded flex justify-between">
              <div>
                <h3 className="font-bold">{item.keterangan}</h3>
                <p>Rp {item.jumlah.toLocaleString()}</p>
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}