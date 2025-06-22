import { Link, useNavigate } from "react-router-dom";

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

export function Navbar({ isLoggedIn, onLogout }: NavbarProps) {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between p-4 border-b bg-white">
      <div className="text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>
        🎓
      </div>
      <ul className="flex gap-6 text-sm">
        <li><Link to="/dashboard" className="hover:underline">Dashboard</Link></li>
        <li><Link to="/aluno" className="hover:underline">Alunos</Link></li>
        <li><Link to="/professor" className="hover:underline">Professores</Link></li>
        <li><Link to="/turma" className="hover:underline">Turmas</Link></li>
        <li><Link to="/sobre" className="hover:underline">Sobre nós</Link></li>
      </ul>
      <div className="flex gap-2">
        {!isLoggedIn ? (
          <>
            <button
              onClick={() => navigate("/login")}
              className="border px-4 py-1 rounded text-sm"
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
            className="bg-black text-white border px-4 py-1 rounded text-sm"
          >
            Sair
          </button>
        )}
      </div>
    </nav>
  );
}