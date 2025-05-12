export function Navbar() {
    return (
      <nav className="flex items-center justify-between p-4 border-b bg-white">
        <div className="text-xl font-bold">🎓</div>
        <ul className="flex gap-6 text-sm">
          <li>Dashboard</li>
          <li>Alunos</li>
          <li>Professores</li>
          <li>Turmas</li>
          <li>Sobre nós</li>
        </ul>
        <div className="flex gap-2">
          <button className="border px-4 py-1 rounded text-sm">Entrar</button>
          <button className="bg-black text-white px-4 py-1 rounded text-sm">Registrar</button>
        </div>
      </nav>
    );
  }