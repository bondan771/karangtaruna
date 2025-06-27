import { useAuth } from "../../contexts/AuthContext";

export default function Header() {
  const { logout, role } = useAuth();

  return (
    <header className="bg-gray-100 p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Dashboard Karang Taruna</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600 capitalize">Role: {role}</span>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
