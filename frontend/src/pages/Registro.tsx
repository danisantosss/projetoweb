import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Hotjar } from './Hotjar';

export default function Registro() {
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (senha !== confirmaSenha) {
      setMensagem('❌ As senhas não conferem!');
      return;
    }

  const data = {
      username: username,
      senha: senha,
  };

  try {
    const response = await fetch('http://localhost:8080/usuario/registrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMensagem('✅ Usuário registrado com sucesso!');
      } else {
        const error = await response.json();
        setMensagem('Erro: ' + (error.message || 'Falha no cadastro'));
      }
    } catch (err) {
      setMensagem('❌ Erro ao conectar com o servidor');
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Hotjar /> {}
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Gerenciador Escolar</h1>
        <p className="text-gray-500 mb-6">Tudo que sua escola precisa, em um só lugar</p>

        <div className="w-full max-w-sm p-6 border rounded-md shadow-sm bg-white">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="text-left">
              <label className="block text-sm font-medium">Usuário</label>
              <input
                type="text"
                placeholder="Digite um usuário"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full border px-3 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div className="text-left">
              <label className="block text-sm font-medium">Senha</label>
              <input
                type="password"
                placeholder="Digite uma senha"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                className="w-full border px-3 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div className="text-left">
              <label className="block text-sm font-medium">Confirme sua Senha</label>
              <input
                type="password"
                placeholder="Confirme sua senha"
                value={confirmaSenha}
                onChange={e => setConfirmaSenha(e.target.value)}
                className="w-full border px-3 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              Registrar
            </button>
            {mensagem && <p className="text-sm mt-2">{mensagem}</p>}
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}