import React, { useState, useEffect, JSX } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import App from './App';
import Colaboradores from './pages/Colaboradores';
import Departamentos from './pages/Departamentos';
import Homepage from './pages/Homepage';
import { auth } from './config/firestore';
import { signInWithEmailAndPassword, onAuthStateChanged, User } from 'firebase/auth';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  if (user === undefined) {
    // Loading indicator (opcional)
    return <div style={{width:'100vw',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Carregando...</div>;
  }
  return user ? children : <Navigate to="/semacesso" />;
};

const RouterApp: React.FC = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(undefined);
      globalThis.location.replace('/homepage');
    } catch (err: any) {
      setError('Credenciais inválidas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} error={error} loading={loading} />} />
        <Route path="/homepage" element={<PrivateRoute><Homepage /></PrivateRoute>} />
        <Route path="/colaboradores" element={<PrivateRoute><Colaboradores /></PrivateRoute>} />
        <Route path="/departamentos" element={<PrivateRoute><Departamentos /></PrivateRoute>} />
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouterApp;
