import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export default function Registro() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Gerenciador Escolar</h1>
        <p className="text-gray-500 mb-6">Tudo que sua escola precisa, em um só lugar</p>

        <div className="w-full max-w-sm p-6 border rounded-md shadow-sm bg-white">
          <form className="space-y-4">
            <div className="text-left">
              <label className="block text-sm font-medium">Usuário</label>
              <input
                type="text"
                placeholder="Digite um usuário"
                className="w-full border px-3 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div className="text-left">
              <label className="block text-sm font-medium">Senha</label>
              <input
                type="password"
                placeholder="Digite uma senha"
                className="w-full border px-3 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div className="text-left">
              <label className="block text-sm font-medium">Confirme sua Senha</label>
              <input
                type="password"
                placeholder="Confirme sua senha"
                className="w-full border px-3 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              Entrar
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}