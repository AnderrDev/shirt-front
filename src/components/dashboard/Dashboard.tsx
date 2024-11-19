import React, { useState } from 'react';
import CamisetaList from './CamisetaList';
import CamisetaModal from './CamisetaModal';
import useCamisetas from '../../hooks/useCamisetas';

interface Camiseta {
  id: number;
  talla: string;
  color: string;
  material: string;
  precio: number;
}

const Dashboard: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const { camisetas, fetchCamisetas, deleteCamiseta, isLoading } = useCamisetas();
  const [showModal, setShowModal] = useState(false);
  const [selectedCamiseta, setSelectedCamiseta] = useState<Camiseta | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const handleEdit = (camiseta: Camiseta) => {
    setSelectedCamiseta(camiseta);
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedCamiseta(null);
    setShowModal(true);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Bienvenido, {user.nombre} {user.apellido}</h2>
        <button onClick={handleLogout} className="btn btn-danger">Cerrar Sesión</button>
      </div>
      <h3>Lista de Camisetas</h3>

      {user.rol === 'Administrador' && (
        <button className="btn btn-primary mb-3" onClick={handleAdd}>
          Añadir Camiseta
        </button>
      )}

      {/* Loader de camisetas */}
      {isLoading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
        <CamisetaList
          camisetas={camisetas}
          onEdit={handleEdit}
          onDelete={deleteCamiseta}
          isAdmin={user.rol === 'Administrador'}
        />
      )}

      {showModal && (
        <CamisetaModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onRefresh={fetchCamisetas}
          camiseta={selectedCamiseta}
        />
      )}
    </div>
  );
};

export default Dashboard;
