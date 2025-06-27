import { useState } from 'react';
import { Footer } from '../components/Footer';

interface Aluno {
    id: number;
    nome: string;
}

interface Professor {
    id: number;
    nome: string;
    disciplina: string;
}

interface Nota {
    id?: number;
    aluno: Aluno;
    professor: Professor;
    nota1: number | null;
    nota2: number | null;
    nota3: number | null;
}

export default function Notas() {
    const [busca, setBusca] = useState('');
    const [mensagemSucesso, setMensagemSucesso] = useState('');
    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const [alunoSelecionado, setAlunoSelecionado] = useState<Aluno | null>(null);
    const [professores, setProfessores] = useState<Professor[]>([]);
    const [notas, setNotas] = useState<Nota[]>([]);

    const buscarAlunos = async (nome: string) => {
        setBusca(nome);
        if (nome.length < 2) {
            setAlunos([]);
            return;
        }
        const res = await fetch(`http://localhost:8080/aluno/buscar?nome=${nome}`);
        const data = await res.json();
        setAlunos(data);
    };

    const selecionarAluno = async (aluno: Aluno) => {
        setAlunoSelecionado(aluno);
        setAlunos([]);
        setBusca(aluno.nome);

        const resProfessores = await fetch(`http://localhost:8080/notas/professores-da-turma/${aluno.id}`);
        const dataProfessores = await resProfessores.json();
        setProfessores(dataProfessores);

        const resNotas = await fetch(`http://localhost:8080/notas/aluno/${aluno.id}`);
        const dataNotas = await resNotas.json();
        setNotas(dataNotas);
    };

    const atualizarNota = (professorId: number, campo: 'nota1' | 'nota2' | 'nota3', valor: number | null) => {
        setNotas(prevNotas => {
            const idx = prevNotas.findIndex(n => n.professor.id === professorId);
            if (idx !== -1) {
                const updated = [...prevNotas];
                updated[idx] = { ...updated[idx], [campo]: valor };
                return updated;
            } else {
                if (!alunoSelecionado) return prevNotas;
                return [...prevNotas, {
                    aluno: alunoSelecionado,
                    professor: professores.find(p => p.id === professorId)!,
                    nota1: campo === 'nota1' ? valor : null,
                    nota2: campo === 'nota2' ? valor : null,
                    nota3: campo === 'nota3' ? valor : null,
                }];
            }
        });
    };

    const salvarNotas = async () => {
        for (const nota of notas) {
            await fetch('http://localhost:8080/notas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nota),
            });
        }
        setMensagemSucesso('Notas salvas com sucesso!');
        setTimeout(() => setMensagemSucesso(''), 3000);
    };

    const calcularMedia = (nota: Nota) => {
        const valores = [nota.nota1, nota.nota2, nota.nota3].filter(n => n !== null) as number[];
        if (valores.length === 0) return '-';
        const soma = valores.reduce((acc, val) => acc + val, 0);
        return (soma / valores.length).toFixed(2);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow flex flex-col items-center pt-6 p-4 bg-gray-50">
                <h1 className="text-xl mb-4 font-bold">Lançamento de Notas</h1>

                <input
                    type="text"
                    placeholder="Buscar aluno pelo nome"
                    value={busca}
                    onChange={e => buscarAlunos(e.target.value)}
                    className="border p-2 rounded w-full max-w-md mb-3"
                />

                {alunos.length > 0 && (
                    <ul className="border max-w-md mb-4 bg-white w-full rounded shadow">
                        {alunos.map(a => (
                            <li
                                key={a.id}
                                className="cursor-pointer p-2 hover:bg-gray-100"
                                onClick={() => selecionarAluno(a)}
                            >
                                {a.nome}
                            </li>
                        ))}
                    </ul>
                )}

                {alunoSelecionado && (
                    <>
                        <h2 className="mb-3 text-base font-semibold">Aluno: {alunoSelecionado.nome}</h2>
                        <table className="w-full max-w-4xl border-collapse border border-gray-300 mb-4 shadow-sm bg-white rounded">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 p-2">Professor</th>
                                    <th className="border border-gray-300 p-2">Disciplina</th>
                                    <th className="border border-gray-300 p-2">Nota 1</th>
                                    <th className="border border-gray-300 p-2">Nota 2</th>
                                    <th className="border border-gray-300 p-2">Nota 3</th>
                                    <th className="border border-gray-300 p-2">Média</th>
                                </tr>
                            </thead>
                            <tbody>
                                {professores.map(prof => {
                                    const nota = notas.find(n => n.professor.id === prof.id);
                                    return (
                                        <tr key={prof.id}>
                                            <td className="border border-gray-300 p-2">{prof.nome}</td>
                                            <td className="border border-gray-300 p-2">{prof.disciplina}</td>
                                            {[1, 2, 3].map(num => (
                                                <td key={num} className="border border-gray-300 p-2 text-center">
                                                    <input
                                                        type="number"
                                                        min={0}
                                                        max={10}
                                                        value={nota ? nota[`nota${num}` as 'nota1' | 'nota2' | 'nota3'] ?? '' : ''}
                                                        onChange={e => {
                                                            const val = e.target.value === '' ? null : Number(e.target.value);
                                                            atualizarNota(prof.id, `nota${num}` as 'nota1' | 'nota2' | 'nota3', val);
                                                        }}
                                                        className="w-16 text-center border rounded px-1"
                                                    />
                                                </td>
                                            ))}
                                            <td className="border border-gray-300 p-2 text-center font-semibold">
                                                {nota ? calcularMedia(nota) : '-'}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <button
                            onClick={salvarNotas}
                            className="bg-blue-600 text-white px-5 py-1.5 rounded hover:bg-blue-700"
                        >
                            Salvar Notas
                        </button>
                        {mensagemSucesso && (
                            <div className="mt-5 p-5 bg-green-500 text-white px-4 py-2 rounded shadow">
                                {mensagemSucesso}
                            </div>
                        )}
                    </>
                )}
            </main>
            <Footer />
        </div>
    );
}