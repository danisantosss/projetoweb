import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

interface Turma {
  id: number;
  nome: string;
  anoLetivo: number;
}

export default function Turmas() {
  const [nome, setNome] = useState("");
  const [anoLetivo, setAnoLetivo] = useState<number | "">("");
  const [turmas, setTurmas] = useState<Turma[]>([]);

  const [turmaEditando, setTurmaEditando] = useState<Turma | null>(null);
  const [editNome, setEditNome] = useState("");
  const [editAnoLetivo, setEditAnoLetivo] = useState<number | "">("");

  useEffect(() => {
    fetchTurmas();
  }, []);

  const fetchTurmas = () => {
    fetch("http://localhost:8080/turma")
      .then((res) => res.json())
      .then((data) => setTurmas(data));
  };

  const handleRegistrar = async () => {
    if (!nome || !anoLetivo) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    const novaTurma = { nome, anoLetivo };

    const res = await fetch("http://localhost:8080/turma", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaTurma),
    });

    if (res.ok) {
      fetchTurmas();
      setNome("");
      setAnoLetivo("");
    } else {
      alert("Erro ao registrar turma");
    }
  };

  const handleExcluir = async (id: number) => {
    const confirm = window.confirm("Tem certeza que deseja excluir esta turma?");
    if (!confirm) return;

    const res = await fetch(`http://localhost:8080/turma/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      fetchTurmas();
    } else {
      alert("Erro ao excluir turma");
    }
  };

  const abrirModalEdicao = (turma: Turma) => {
    setTurmaEditando(turma);
    setEditNome(turma.nome);
    setEditAnoLetivo(turma.anoLetivo);
  };

  const fecharModalEdicao = () => {
    setTurmaEditando(null);
    setEditNome("");
    setEditAnoLetivo("");
  };

  const handleAtualizar = async () => {
    if (!turmaEditando) return;

    if (!editNome || !editAnoLetivo) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    const turmaAtualizada = {
      nome: editNome,
      anoLetivo: editAnoLetivo,
    };

    const res = await fetch(`http://localhost:8080/turma/${turmaEditando.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(turmaAtualizada),
    });

    if (res.ok) {
      fetchTurmas();
      fecharModalEdicao();
    } else {
      alert("Erro ao atualizar turma");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 px-4 py-8 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Registrar Turma</h1>

        <div className="mb-10 max-w-md">
          <input
            type="text"
            placeholder="Nome da Turma"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="border px-3 py-3 rounded w-full mb-4"
          />
          <input
            type="number"
            placeholder="Ano Letivo"
            value={anoLetivo}
            onChange={(e) => setAnoLetivo(Number(e.target.value))}
            className="border px-3 py-3 rounded w-full mb-4"
          />
          <button
            onClick={handleRegistrar}
            className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800"
          >
            Registrar
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Nome</th>
                <th className="border px-4 py-2">Ano Letivo</th>
                <th className="border px-4 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {turmas.map((turma) => (
                <tr key={turma.id}>
                  <td className="border px-4 py-2">{turma.id}</td>
                  <td className="border px-4 py-2">{turma.nome}</td>
                  <td className="border px-4 py-2">{turma.anoLetivo}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => abrirModalEdicao(turma)}
                      className="text-blue-600 hover:underline mr-4"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleExcluir(turma.id)}
                      className="text-red-600 hover:underline"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {turmaEditando && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Editar Turma</h2>
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Nome da Turma"
                  value={editNome}
                  onChange={(e) => setEditNome(e.target.value)}
                  className="border px-3 py-2 rounded"
                />
                <input
                  type="number"
                  placeholder="Ano Letivo"
                  value={editAnoLetivo}
                  onChange={(e) => setEditAnoLetivo(Number(e.target.value))}
                  className="border px-3 py-2 rounded"
                />
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={fecharModalEdicao}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAtualizar}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}