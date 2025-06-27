import { useAuth } from "../../contexts/AuthContext";

export default function Home() {
  const { currentUser } = useAuth();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Dashboard Karang Taruna</h1>
      <p>Selamat datang di dashboard!</p>
      
      {currentUser && (
        <div className="mt-4 p-4 bg-gray-50 rounded">
          <h2 className="text-lg font-semibold">Informasi Akun</h2>
          <p>Email: {currentUser.email}</p>
          <p>Role: {currentUser.role}</p>
        </div>
      )}
    </div>
  );
}