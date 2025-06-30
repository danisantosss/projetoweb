import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';

export default function Inicio() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 px-4 py-10 flex flex-col items-center text-center bg-gray-50">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Sistema Escolar</h1>
        <p className="text-gray-600 mb-8 max-w-xl">
          Acesse rapidamente as funcionalidades do sistema para gerenciar alunos, professores, turmas e notas.
        </p>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 w-full max-w-6xl">
          <Link to="/aluno" className="bg-white p-6 rounded shadow border hover:shadow-md transition text-left">
            <h2 className="text-xl font-semibold mb-2">Alunos</h2>
            <p className="text-sm text-gray-500">Gerencie todos os alunos cadastrados.</p>
          </Link>

          <Link to="/professor" className="bg-white p-6 rounded shadow border hover:shadow-md transition text-left">
            <h2 className="text-xl font-semibold mb-2">Professores</h2>
            <p className="text-sm text-gray-500">Gerencie os professores e suas disciplinas.</p>
          </Link>

          <Link to="/turma" className="bg-white p-6 rounded shadow border hover:shadow-md transition text-left">
            <h2 className="text-xl font-semibold mb-2">Turmas</h2>
            <p className="text-sm text-gray-500">Visualize e edite as turmas da escola.</p>
          </Link>

          <Link to="/notas" className="bg-white p-6 rounded shadow border hover:shadow-md transition text-left">
            <h2 className="text-xl font-semibold mb-2">Notas</h2>
            <p className="text-sm text-gray-500">Lance e consulte as notas dos alunos.</p>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}