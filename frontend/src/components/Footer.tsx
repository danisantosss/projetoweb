import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="grid grid-cols-3 gap-8 p-8 text-sm text-white border-t bg-black">
      <div>
        <p className="font-bold text-lg mb-2">Gerenciador Escolar</p>
        <p>© {new Date().getFullYear()} - Todos os direitos reservados.</p>
      </div>

      <div>
        <p className="font-semibold mb-2">Navegação</p>
        <nav className="flex flex-col gap-1">
          <Link to="/inicio" className="hover:underline">Início</Link>
          <Link to="/aluno" className="hover:underline">Alunos</Link>
          <Link to="/professor" className="hover:underline">Professores</Link>
          <Link to="/turma" className="hover:underline">Turmas</Link>
          <Link to="/notas" className="hover:underline">Notas</Link>
        </nav>
      </div>

      <div>
        <p className="font-semibold mb-2">Contato</p>
        <p>Email: suporte@gerenciadorescolar.com</p>
        <p>Telefone: (47) 98765-4321</p>
        <p>Endereço: Rua 123 - Joinville</p>
      </div>
    </footer>
  );
}