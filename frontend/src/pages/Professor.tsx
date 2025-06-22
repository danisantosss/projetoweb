import { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

interface Turma {
    id: number;
    nome: string;
}

interface Professor {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    disciplina: string;
    turma: Turma;
}

export default function Professores() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [disciplina, setDisciplina] = useState('');
    const [turmaId, setTurmaId] = useState('');
    const [turmas, setTurmas] = useState<Turma[]>([]);
    const [professores, setProfessores] = useState<Professor[]>([]);
    const [professorEditando, setProfessorEditando] = useState<Professor | null>(null);
    const [editNome, setEditNome] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editCpf, setEditCpf] = useState('');
    const [editDisciplina, setEditDisciplina] = useState('');
    const [editTurmaId, setEditTurmaId] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/turma')
            .then(res => res.json())
            .then(data => setTurmas(data));

        fetchProfessores();
    }, []);

    const fetchProfessores = () => {
        fetch('http://localhost:8080/professor')
            .then(res => res.json())
            .then(data => setProfessores(data));
    };

    const handleRegistrar = async () => {
        const professor = {
            nome,
            email,
            cpf,
            disciplina,
            turma: { id: Number(turmaId) },
        };

        const res = await fetch('http://localhost:8080/professor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(professor),
        });

        if (res.ok) {
            fetchProfessores();
            setNome('');
            setEmail('');
            setCpf('');
            setDisciplina('');
            setTurmaId('');
        }
    };

    const handleExcluir = async (id: number) => {
        await fetch(`http://localhost:8080/professor/${id}`, { method: 'DELETE' });
        fetchProfessores();
    };

    const abrirModalEdicao = (professor: Professor) => {
        setProfessorEditando(professor);
        setEditNome(professor.nome);
        setEditEmail(professor.email);
        setEditCpf(professor.cpf);
        setEditDisciplina(professor.disciplina);
        setEditTurmaId(professor.turma?.id.toString() || '');
    };

    const handleAtualizar = async () => {
        if (!professorEditando) return;

        const professorAtualizado = {
            nome: editNome,
            email: editEmail,
            cpf: editCpf,
            disciplina: editDisciplina,
            turma: { id: Number(editTurmaId) },
        };

        const res = await fetch(`http://localhost:8080/professor/${professorEditando.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(professorAtualizado),
        });

        if (res.ok) {
            setProfessorEditando(null);
            fetchProfessores();
        }
    };
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 px-4 py-8 max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Registrar Professor</h1>

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
                            type="text"
                            value={cpf}
                            onChange={e => setCpf(e.target.value)}
                            placeholder="CPF"
                            className="border px-3 py-3 rounded w-60"
                        />
                        <input
                            type="text"
                            value={disciplina}
                            onChange={e => setDisciplina(e.target.value)}
                            placeholder="Disciplina"
                            className="border px-3 py-3 rounded w-64"
                        />
                        <select
                            value={turmaId}
                            onChange={e => setTurmaId(e.target.value)}
                            className="border px-3 py-3 rounded w-96"
                        >
                            <option value="">Selecione uma turma</option>
                            {turmas.map(turma => (
                                <option key={turma.id} value={turma.id}>{turma.nome}</option>
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
                                    <th className="border px-4 py-2">CPF</th>
                                    <th className="border px-4 py-2">Disciplina</th>
                                    <th className="border px-4 py-2">Turma</th>
                                    <th className="border px-4 py-2">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {professores.map(prof => (
                                    <tr key={prof.id}>
                                        <td className="border px-4 py-2">{prof.id}</td>
                                        <td className="border px-4 py-2">{prof.nome}</td>
                                        <td className="border px-4 py-2">{prof.email}</td>
                                        <td className="border px-4 py-2">{prof.cpf}</td>
                                        <td className="border px-4 py-2">{prof.disciplina}</td>
                                        <td className="border px-4 py-2">{prof.turma?.nome || '-'}</td>
                                        <td className="border px-4 py-2">
                                            <button onClick={() => abrirModalEdicao(prof)} className="text-blue-600 hover:underline mr-2">Editar</button>
                                            <button onClick={() => handleExcluir(prof.id)} className="text-red-600 hover:underline">Excluir</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {professorEditando && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
                            <h2 className="text-xl font-bold mb-4">Editar Professor</h2>
                            <div className="flex flex-col gap-4">
                                <input
                                    type="text"
                                    value={editNome}
                                    onChange={e => setEditNome(e.target.value)}
                                    placeholder="Nome"
                                    className="border px-3 py-2 rounded"
                                />
                                <input
                                    type="email"
                                    value={editEmail}
                                    onChange={e => setEditEmail(e.target.value)}
                                    placeholder="Email"
                                    className="border px-3 py-2 rounded"
                                />
                                <input
                                    type="text"
                                    value={editCpf}
                                    onChange={e => setEditCpf(e.target.value)}
                                    placeholder="CPF"
                                    className="border px-3 py-2 rounded"
                                />
                                <input
                                    type="text"
                                    value={editDisciplina}
                                    onChange={e => setEditDisciplina(e.target.value)}
                                    placeholder="Disciplina"
                                    className="border px-3 py-2 rounded"
                                />
                                <select
                                    value={editTurmaId}
                                    onChange={e => setEditTurmaId(e.target.value)}
                                    className="border px-3 py-2 rounded"
                                >
                                    <option value="">Selecione uma turma</option>
                                    {turmas.map(turma => (
                                        <option key={turma.id} value={turma.id}>{turma.nome}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                                <button onClick={() => setProfessorEditando(null)} className="px-4 py-2 border rounded hover:bg-gray-100">Cancelar</button>
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