'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import useAPI from "@/hooks/api/useAPI";

export default function LoginPage() {
  const { httpPost } = useAPI();
  const router = useRouter();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await httpPost("authguelta", { usuario, senha });

      if (response?.token) {
        // 🔹 Armazena o token e dados do usuário
        localStorage.setItem("token", response.token);
        localStorage.setItem("guelta_usuario", JSON.stringify(response));

        // 🔹 Redireciona para a página principal
        router.push("/guelta/home");
      } else {
        setError("Usuário ou senha inválidos.");
      }
    } catch (error) {
      console.error("Erro ao autenticar:", error);
      setError("Falha ao conectar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">🔐 Login</h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Campo Usuário */}
          <input
            type="text"
            placeholder="Usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 text-black"
            required
          />

          {/* Campo Senha */}
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 text-zinc-500"
            required
          />

          {/* Botão de Login */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition"
            disabled={loading}
          >
            {loading ? "🔄 Entrando..." : "➡️ Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
