import React, { useState } from 'react';
import { Footer } from '../components/Footer';

export default function Login() {
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/usuario/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, senha }),
      });

      const texto = await response.text();

      if (response.ok) {
        localStorage.setItem('usuarioLogado', 'true');
        setMensagem('✅ Login realizado com sucesso!');
        window.location.href = '/inicio';
      } else {
        setMensagem(`❌ ${texto}`);
      }
    } catch (erro) {
      setMensagem('❌ Erro ao conectar com o servidor');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Gerenciador Escolar</h1>
        <p className="text-gray-500 mb-6">Bem-Vindo Novamente!</p>

        <div className="w-full max-w-sm p-6 border rounded-md shadow-sm bg-white">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="text-left">
              <label className="block text-sm font-medium">Usuário</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite um usuário"
                className="w-full border px-3 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div className="text-left">
              <label className="block text-sm font-medium">Senha</label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite sua senha"
                className="w-full border px-3 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              Entrar
            </button>
            {mensagem && <p className="text-sm mt-2">{mensagem}</p>}
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}