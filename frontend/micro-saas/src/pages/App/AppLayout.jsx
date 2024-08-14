import { Outlet } from "react-router-dom";
import Header from "./Header.jsx/Header";

export default function AppLayout() {
  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen bg-gray-100">
        <main className="flex-1 w-full flex items-center justify-center">
          <Outlet />
        </main>

        <footer className="bg-[#003366] text-white text-center py-4">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
