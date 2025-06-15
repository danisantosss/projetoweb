import { JSX } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: JSX.Element;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const usuarioLogado = localStorage.getItem('usuarioLogado');
  return usuarioLogado ? children : <Navigate to="/login" replace />;
}