export function Footer() {
    return (
      <footer className="grid grid-cols-4 gap-8 p-8 text-sm text-gray-600 border-t bg-white">
        <div className="font-bold text-lg">🎓</div>
        <div>
            <p className="font-semibold">Painel Principal</p>
            <p>Visão Geral</p>
            <p>Relatórios</p>
            <p>Eventos</p>
            <p>Mensagens</p>
        </div>
        <div>
            <p className="font-semibold">Acadêmico</p>
            <p>Turmas</p>
            <p>Alunos</p>
            <p>Professores</p>
            <p>Notas & Faltas</p>
        </div>
        <div>
            <p className="font-semibold">Administração</p>
            <p>Usuários</p>
            <p>Permissões</p>
            <p>Financeiro</p>
            <p>Configurações</p>
        </div>
      </footer>
    );
  }