import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Gerenciador Escolar</h1>
        <p className="text-gray-500 mb-6">Tudo que sua escola precisa, em um só lugar</p>
        <div className="flex gap-4">
          <Link to="/login" className="border px-4 py-2 rounded">
            Entrar
          </Link>
          <Link to="/registro" className="bg-black text-white px-4 py-2 rounded">
            Registrar
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}