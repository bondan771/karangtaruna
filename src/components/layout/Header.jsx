import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function Header() {
  return (
    <header className="bg-gray-100 p-4 flex justify-between">
      <h1 className="font-bold">Karang Taruna</h1>
      <button
        onClick={() => signOut(auth)}
        className="text-red-500 hover:underline"
      >
        Logout
      </button>
    </header>
  );
}
