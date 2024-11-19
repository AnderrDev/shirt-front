import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [rol, setRol] = useState('Cliente'); // Valor por defecto
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado para el loader
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Activar loader
    setError(''); // Limpiar errores
    try {
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('apellido', apellido);
      formData.append('correo', correo);
      formData.append('rol', rol); // Incluye el rol seleccionado
      formData.append('usuario', usuario);
      formData.append('clave', clave);

      await axios.post('http://127.0.0.1:5000/clientes/', formData);

      alert('Usuario registrado exitosamente');
      navigate('/');
    } catch (error) {
      console.error(error);
      setError('Error al registrar el usuario');
    } finally {
      setIsLoading(false); // Desactivar loader
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="text-center mb-4">Registro</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            id="nombre"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="apellido" className="form-label">Apellido</label>
          <input
            type="text"
            id="apellido"
            className="form-control"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="correo" className="form-label">Correo</label>
          <input
            type="email"
            id="correo"
            className="form-control"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
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
          <input
            type="password"
            id="clave"
            className="form-control"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="rol" className="form-label">Rol</label>
          <select
            id="rol"
            className="form-select"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            required
          >
            <option value="Cliente">Cliente</option>
            <option value="Administrador">Administrador</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success w-100" disabled={isLoading}>
          {isLoading ? (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          ) : (
            'Registrarse'
          )}
        </button>
        <p className="mt-2 text-center">
          ¿Ya tienes cuenta? <Link to="/">Iniciar Sesión</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
