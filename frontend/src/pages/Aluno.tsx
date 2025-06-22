import { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

interface Turma {
  id: number;
  nome: string;
}

interface Aluno {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  dataNascimento: string;
  turma: Turma;
}

export default function Alunos() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [turmaId, setTurmaId] = useState('');
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [alunoEditando, setAlunoEditando] = useState<Aluno | null>(null);
  const [editNome, setEditNome] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editCpf, setEditCpf] = useState('');
  const [editDataNascimento, setEditDataNascimento] = useState('');
  const [editTurmaId, setEditTurmaId] = useState('');

  // Buscar turmas e alunos ao carregar a página
  useEffect(() => {
    fetch('http://localhost:8080/turma')
      .then(res => res.json())
      .then(data => setTurmas(data));

    fetchAlunos();
  }, []);

  const fetchAlunos = () => {
    fetch('http://localhost:8080/aluno')
      .then(res => res.json())
      .then(data => setAlunos(data));
  };

  const handleRegistrar = async () => {
    const aluno = { nome, email, cpf, dataNascimento, turma: { id: Number(turmaId) } };

    const res = await fetch('http://localhost:8080/aluno', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(aluno),
    });

    if (res.ok) {
      fetchAlunos();
      setNome('');
      setEmail('');
      setCpf('');
      setDataNascimento('');
      setTurmaId('');
    }
  };

  const abrirModalEdicao = (aluno: Aluno) => {
    setAlunoEditando(aluno);
    setEditNome(aluno.nome);
    setEditEmail(aluno.email);
    setEditCpf(aluno.cpf);
    setEditDataNascimento(aluno.dataNascimento);
    setEditTurmaId(aluno.turma?.id.toString() || '');
  };

  const handleAtualizar = async () => {
    if (!alunoEditando) return;

    const alunoAtualizado = {
      nome: editNome,
      email: editEmail,
      cpf: editCpf,
      dataNascimento: editDataNascimento,
      turma: { id: Number(editTurmaId) },
    };

    const res = await fetch(`http://localhost:8080/aluno/${alunoEditando.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alunoAtualizado),
    });

    if (res.ok) {
      setAlunoEditando(null);
      fetchAlunos();
    }
  };

  const handleExcluir = async (id: number) => {
    await fetch(`http://localhost:8080/aluno/${id}`, { method: 'DELETE' });
    fetchAlunos();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 px-4 py-8 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Registrar Aluno</h1>

        <div className="mb-10 max-w-2x1">
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              value={nome}
              onChange={e => setNome(e.target.value)}
              placeholder="Nome"
              className="border px-3 py-3 rounded flex-1"
            />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              className="border px-3 py-3 rounded flex-1"
            />
          </div>

          <div className="flex gap-4 items-center">
            <input
              type="date"
              value={dataNascimento}
              onChange={e => setDataNascimento(e.target.value)}
              className="border px-3 py-3 rounded rounded w-64"
            />
            <input
              type="text"
              value={cpf}
              onChange={e => setCpf(e.target.value)}
              placeholder="CPF"
              className="border px-3 py-3 rounded w-60"
            />
            <select
              value={turmaId}
              onChange={e => setTurmaId(e.target.value)}
              className="border px-3 py-3 rounded rounded w-96"
            >
              <option value="">Selecione uma turma</option>
              {turmas.map(turma => (
                <option key={turma.id} value={turma.id}>
                  {turma.nome}
                </option>
              ))}
            </select>
            <button
              onClick={handleRegistrar}
              className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800"
              style={{ height: '40px' }}
            >
              Registrar
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="max-h-96 overflow-y-auto border">
            <table className="min-w-full border">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="border px-4 py-2">ID</th>
                  <th className="border px-4 py-2">Nome</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Data de Nascimento</th>
                  <th className="border px-4 py-2">CPF</th>
                  <th className="border px-4 py-2">Turma</th>
                  <th className="border px-4 py-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {alunos.map(aluno => (
                  <tr key={aluno.id}>
                    <td className="border px-4 py-2">{aluno.id}</td>
                    <td className="border px-4 py-2">{aluno.nome}</td>
                    <td className="border px-4 py-2">{aluno.email}</td>
                    <td className="border px-4 py-2">{aluno.dataNascimento}</td>
                    <td className="border px-4 py-2">{aluno.cpf}</td>
                    <td className="border px-4 py-2">{aluno.turma?.nome}</td>
                    <td className="border px-4 py-2">
                      <button onClick={() => abrirModalEdicao(aluno)} className="text-blue-600 hover:underline mr-2">Editar</button>
                      <button onClick={() => handleExcluir(aluno.id)} className="text-red-600 hover:underline">Excluir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {alunoEditando && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
              <h2 className="text-xl font-bold mb-4">Editar Aluno</h2>
              <div className="flex flex-col gap-4">
                <input type="text" value={editNome} onChange={e => setEditNome(e.target.value)} placeholder="Nome" className="border px-3 py-2 rounded" />
                <input type="email" value={editEmail} onChange={e => setEditEmail(e.target.value)} placeholder="Email" className="border px-3 py-2 rounded" />
                <input type="text" value={editCpf} onChange={e => setEditCpf(e.target.value)} placeholder="CPF" className="border px-3 py-2 rounded" />
                <input type="date" value={editDataNascimento} onChange={e => setEditDataNascimento(e.target.value)} className="border px-3 py-2 rounded" />
                <select value={editTurmaId} onChange={e => setEditTurmaId(e.target.value)} className="border px-3 py-2 rounded">
                  <option value="">Selecione uma turma</option>
                  {turmas.map(turma => (
                    <option key={turma.id} value={turma.id}>{turma.nome}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button onClick={() => setAlunoEditando(null)} className="px-4 py-2 border rounded hover:bg-gray-100">Cancelar</button>
                <button onClick={handleAtualizar} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Salvar</button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}