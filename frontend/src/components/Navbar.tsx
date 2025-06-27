import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/escola.png';

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

export function Navbar({ isLoggedIn, onLogout }: NavbarProps) {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between p-7 border-b bg-blue-800">
      <div className="text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>
        <img src={logo} alt="Logo" className="h-9 w-10" />
      </div>
      <ul className="flex gap-6 text-md text-white">
        <li><Link to="/inicio" className="hover:underline">Início</Link></li>
        <li><Link to="/aluno" className="hover:underline">Alunos</Link></li>
        <li><Link to="/professor" className="hover:underline">Professores</Link></li>
        <li><Link to="/turma" className="hover:underline">Turmas</Link></li>
        <li><Link to="/notas" className="hover:underline">Notas</Link></li>
      </ul>
      <div className="flex gap-2">
        {!isLoggedIn ? (
          <>
            <button
              onClick={() => navigate("/login")}
              className="border px-4 py-1 rounded text-sm bg-white"
            >
              Entrar
            </button>
            <button
              onClick={() => navigate("/registro")}
              className="bg-black text-white px-4 py-1 rounded text-sm"
            >
              Registrar
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              onLogout();
              navigate('/login');
            }}
            className="bg-white font-bold text-black border px-4 py-1 rounded text-sm">
            Sair
          </button>
        )}
      </div>
    </nav>
  );
}