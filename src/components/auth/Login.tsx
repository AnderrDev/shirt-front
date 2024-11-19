import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const [mostrarClave, setMostrarClave] = useState(false); // Estado para mostrar u ocultar la clave
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('usuario', usuario);
      formData.append('clave', clave);

      const response = await axios.post('http://127.0.0.1:5000/clientes/login', formData);
      const { access_token, usuario: userInfo } = response.data;

      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(userInfo));

      navigate('/dashboard');
    } catch (error: any) {
      if (error.response) {
        // Si el error tiene una respuesta del servidor
        const status = error.response.status;
        if (status === 401) {
          setError('Usuario o clave incorrectos');
        } else if (status === 400) {
          setError('Faltan datos o la solicitud es inválida');
        } else {
          setError('Error del servidor. Intenta más tarde.');
        }
      } else if (error.request) {
        // Si no hay respuesta del servidor
        setError('No se pudo conectar con el servidor. Verifica tu conexión.');
      } else {
        // Otro tipo de error (e.g., problemas al configurar la solicitud)
        setError('Ocurrió un error inesperado. Intenta de nuevo.');
      }

      console.error('Error en el inicio de sesión:', error);
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
        <button type="submit" className="btn btn-primary w-100">Ingresar</button>
      </form>
      <p className="mt-3 text-center">
        ¿No tienes una cuenta? <Link to="/registro">Regístrate</Link>
      </p>
    </div>
  );
};

export default Login;
