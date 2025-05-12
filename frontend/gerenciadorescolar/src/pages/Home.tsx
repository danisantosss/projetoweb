import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Gerenciador Escolar</h1>
        <p className="text-gray-500 mb-6">Tudo que sua escola precisa, em um só lugar</p>
        <div className="flex gap-4">
          <button className="border px-4 py-2 rounded">Entrar</button>
          <button className="bg-black text-white px-4 py-2 rounded">Registrar</button>
        </div>
      </main>
      <Footer />
    </div>
  );
}