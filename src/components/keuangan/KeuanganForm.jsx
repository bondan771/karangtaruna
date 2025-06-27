import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  serverTimestamp 
} from "firebase/firestore";

export default function KeuanganForm({ onSaved, selected, clearSelected }) {
  const [keterangan, setKeterangan] = useState("");
  const [jumlah, setJumlah] = useState("");

  useEffect(() => {
    if (selected) {
      setKeterangan(selected.keterangan || "");
      setJumlah(selected.jumlah || "");
    } else {
      resetForm();
    }
  }, [selected]);

  const resetForm = () => {
    setKeterangan("");
    setJumlah("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const data = {
        keterangan,
        jumlah: Number(jumlah),
        tanggal: serverTimestamp()
      };

      if (selected) {
        await updateDoc(doc(db, "keuangan", selected.id), data);
      } else {
        await addDoc(collection(db, "keuangan"), data);
      }
      
      resetForm();
      clearSelected();
      onSaved();
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded space-y-2">
      <h2 className="font-bold">{selected ? "Edit" : "Tambah"} Transaksi</h2>
      
      <input
        type="text"
        placeholder="Keterangan"
        value={keterangan}
        onChange={(e) => setKeterangan(e.target.value)}
        className="w-full border p-2"
        required
      />
      
      <input
        type="number"
        placeholder="Jumlah"
        value={jumlah}
        onChange={(e) => setJumlah(e.target.value)}
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