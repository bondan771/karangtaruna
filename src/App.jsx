import React from "react";
import AppRoutes from "./routes/AppRoutes";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import { useAuth } from "./contexts/AuthContext";

const App = () => {
  const { currentUser } = useAuth();

  return (
    <div className="flex h-screen">
      {currentUser && <Sidebar />}
      <div className="flex-1 flex flex-col">
        {currentUser && <Header />}
        <main className="flex-1 overflow-y-auto p-4">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
};

export default App;
