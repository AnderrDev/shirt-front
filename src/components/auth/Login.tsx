import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const [mostrarClave, setMostrarClave] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Estado para el loader
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Activar loader
    setError(''); // Limpiar errores
    try {
      const formData = new FormData();
      formData.append('usuario', usuario);
      formData.append('clave', clave);

      const response = await axios.post('https://13.58.157.172/clientes/login', formData);
      const { access_token, usuario: userInfo } = response.data;

      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(userInfo));

      navigate('/dashboard');
    } catch (error: any) {
      if (error.response) {
        const status = error.response.status;
        if (status === 401) {
          setError('Usuario o clave incorrectos');
        } else if (status === 400) {
          setError('Faltan datos o la solicitud es inválida');
        } else {
          setError('Error del servidor. Intenta más tarde.');
        }
      } else if (error.request) {
        setError('No se pudo conectar con el servidor. Verifica tu conexión.');
      } else {
        setError('Ocurrió un error inesperado. Intenta de nuevo.');
      }
    } finally {
      setIsLoading(false); // Desactivar loader
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="text-center mb-4">Iniciar Sesión</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="usuario" className="form-label">Usuario</label>
          <input
            type="text"
            id="usuario"
            className="form-control"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="clave" className="form-label">Clave</label>
          <div className="input-group">
            <input
              type={mostrarClave ? 'text' : 'password'}
              id="clave"
              className="form-control"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setMostrarClave(!mostrarClave)}
            >
              <i className={`bi ${mostrarClave ? 'bi-eye-slash' : 'bi-eye'}`}></i>
            </button>
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
          {isLoading ? (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          ) : (
            'Ingresar'
          )}
        </button>
      </form>
      <p className="mt-3 text-center">
        ¿No tienes una cuenta? <Link to="/registro">Regístrate</Link>
      </p>
    </div>
  );
};

export default Login;
