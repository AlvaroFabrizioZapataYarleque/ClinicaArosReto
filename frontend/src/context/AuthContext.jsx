import { createContext, useState, useContext, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const tokenGuardado = localStorage.getItem('token');
    if (tokenGuardado) {
      setToken(tokenGuardado);
      cargarUsuario(tokenGuardado);
    } else {
      setCargando(false);
    }
  }, []);

  const cargarUsuario = async (token) => {
    try {
      const { data } = await api.get('/api/auth/perfil', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsuario(data);
    } catch {
      localStorage.removeItem('token');
      setToken(null);
      setUsuario(null);
    } finally {
      setCargando(false);
    }
  };

  const login = async (email, password) => {
    const { data } = await api.post('/api/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUsuario({ _id: data._id, nombre: data.nombre, email: data.email, telefono: data.telefono, dni: data.dni, direccion: data.direccion, vehiculos: data.vehiculos, rol: data.rol });
    return data;
  };

  const registrar = async (datos) => {
    const { data } = await api.post('/api/auth/registrar', datos);
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUsuario({ _id: data._id, nombre: data.nombre, email: data.email, telefono: data.telefono, dni: data.dni, direccion: data.direccion, vehiculos: data.vehiculos, rol: data.rol });
    return data;
  };

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('carrito');
    setToken(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, token, cargando, login, registrar, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
};
