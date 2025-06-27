import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  Timestamp 
} from "firebase/firestore";

export default function KegiatanForm({ onSaved, selected, clearSelected }) {
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tanggal, setTanggal] = useState("");

  useEffect(() => {
    if (selected) {
      setJudul(selected.judul || "");
      setDeskripsi(selected.deskripsi || "");
      
      // Konversi Firestore Timestamp ke string input
      if (selected.tanggal?.seconds) {
        const date = new Date(selected.tanggal.seconds * 1000);
        setTanggal(date.toISOString().split('T')[0]);
      }
    } else {
      resetForm();
    }
  }, [selected]);

  const resetForm = () => {
    setJudul("");
    setDeskripsi("");
    setTanggal("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const data = {
        judul,
        deskripsi,
        tanggal: Timestamp.fromDate(new Date(tanggal))
      };

      if (selected) {
        await updateDoc(doc(db, "kegiatan", selected.id), data);
      } else {
        await addDoc(collection(db, "kegiatan"), data);
      }
      
      resetForm();
      clearSelected();
      onSaved();
    } catch (error) {
      console.error("Error saving activity:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded space-y-2">
      <h2 className="font-bold">{selected ? "Edit" : "Tambah"} Kegiatan</h2>
      
      <input
        type="text"
        placeholder="Judul"
        value={judul}
        onChange={(e) => setJudul(e.target.value)}
        className="w-full border p-2"
        required
      />
      
      <textarea
        placeholder="Deskripsi"
        value={deskripsi}
        onChange={(e) => setDeskripsi(e.target.value)}
        className="w-full border p-2"
        required
      />
      
      <input
        type="date"
        value={tanggal}
        onChange={(e) => setTanggal(e.target.value)}
        className="w-full border p-2"
        required
      />
      
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        {selected ? "Update" : "Tambah"}
      </button>
      
      {selected && (
        <button
          type="button"
          onClick={clearSelected}
          className="ml-2 text-gray-500"
        >
          Batal
        </button>
      )}
    </form>
  );
}