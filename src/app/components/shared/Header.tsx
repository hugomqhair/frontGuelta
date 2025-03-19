"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const [usuario, setUsuario] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname(); // 📌 Obtém a rota atual

  useEffect(() => {
    async function carregarUsuario() {
      await new Promise((resolve) => setTimeout(resolve, 200)); // Simula async
      const storedUser = JSON.parse(localStorage.getItem("guelta_usuario") || "{}");
      setUsuario(storedUser?.usuario || null);
    }
    carregarUsuario();
  }, []);

  async function handleLogout() {
    await new Promise<void>((resolve) => {
      localStorage.removeItem("guelta_usuario"); // Remove os dados do usuário
      localStorage.removeItem("token"); // Remove o token de login
      resolve();
    });
    router.push("/"); // Redireciona para a página de login
  }

  // 🔹 Esconde o cabeçalho na tela de login
  if (pathname === "/") return null;

  return (
    <header className="flex bg-gray-900 text-white py-4 px-6 justify-between items-center top-0 left-0 w-full shadow-lg z-50">
      {/* 🔹 Título */}
      <div className="flex items-center gap-1">
        <h1 className="text-xl font-bold bg-black rounded-full p-2">M|Q</h1>
        <div>Gestão de Gueltas</div>
      </div>

      {/* 🔹 Usuário e Logout */}
      {usuario && (
        <div className="flex items-center gap-4">
          <p className="text-white bg-purple-800 rounded-full p-2">👤 {usuario}</p>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md transition"
          >
            🚪 Sair
          </button>
        </div>
      )}
    </header>
  );
}
