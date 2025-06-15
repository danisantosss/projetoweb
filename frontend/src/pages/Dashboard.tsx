import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export default function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado');
    window.location.href = '/login';
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 px-4 py-10 flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold mb-4">Painel do Administrador</h1>
        <p className="text-gray-600 mb-8">Bem-vindo ao seu painel de controle do Gerenciador Escolar.</p>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-4xl">
          <div className="bg-white p-6 rounded shadow border">
            <h2 className="text-xl font-semibold mb-2">Alunos</h2>
            <p className="text-sm text-gray-500">Gerencie todos os alunos cadastrados.</p>
          </div>
          <div className="bg-white p-6 rounded shadow border">
            <h2 className="text-xl font-semibold mb-2">Professores</h2>
            <p className="text-sm text-gray-500">Gerencie os professores e suas disciplinas.</p>
          </div>
          <div className="bg-white p-6 rounded shadow border">
            <h2 className="text-xl font-semibold mb-2">Turmas</h2>
            <p className="text-sm text-gray-500">Visualize e edite as turmas da escola.</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-10 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
        >
          Sair
        </button>
      </main>
      <Footer />
    </div>
  );
}