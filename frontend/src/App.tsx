import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Dashboard from './pages/Dashboard';
import Aluno from './pages/Aluno';
import Professor from './pages/Professor';
import Turma from './pages/Turma';
import PrivateRoute from './components/PrivateRoute';
import { Navbar } from './components/Navbar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const logged = localStorage.getItem("usuarioLogado");
    setIsLoggedIn(logged === 'true');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/dashboard" element={
          <PrivateRoute><Dashboard /></PrivateRoute>
        } />
        <Route path="/aluno" element={
          <PrivateRoute><Aluno /></PrivateRoute>
        } />
        <Route path="/professor" element={
          <PrivateRoute><Professor /></PrivateRoute>
        } />
        <Route path="/turma" element={
          <PrivateRoute><Turma /></PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;