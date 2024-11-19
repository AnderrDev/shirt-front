import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';

interface Props {
  show: boolean;
  onClose: () => void;
  onRefresh: () => void;
  camiseta: Camiseta | null; // Recibimos la camiseta directamente
}

interface Camiseta {
  id: number;
  talla: string;
  color: string;
  material: string;
  precio: number;
}

const tallasOptions = ['S', 'M', 'L', 'XL'];
const coloresOptions = [
  'Rojo',
  'Azul',
  'Verde',
  'Negro',
  'Amarillo',
  'Naranja',
  'Morado',
  'Cyan',
  'Magenta',
  'Gris'
]; const materialesOptions = ['Algodón', 'Poliéster', 'Lana'];

const CamisetaModal: React.FC<Props> = ({ show, onClose, onRefresh, camiseta }) => {
  const [talla, setTalla] = useState('');
  const [color, setColor] = useState('');
  const [material, setMaterial] = useState('');
  const [precio, setPrecio] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (show) {
      if (camiseta) {
        setTalla(camiseta.talla);
        setColor(camiseta.color);
        setMaterial(camiseta.material);
        setPrecio(camiseta.precio);
      } else {
        setTalla('');
        setColor('');
        setMaterial('');
        setPrecio(0);
      }
      setError('');
    }
  }, [camiseta, show]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (precio <= 0) {
      setError('El precio debe ser mayor a 0');
      return;
    }

    const formData = new FormData();
    formData.append('talla', talla);
    formData.append('color', color);
    formData.append('material', material);
    formData.append('precio', precio.toString());

    try {
      if (camiseta) {
        await axiosInstance.put(`/camisetas/${camiseta.id}`, formData);
        alert('Camiseta actualizada');
      } else {
        await axiosInstance.post('/camisetas/', formData);
        alert('Camiseta creada');
      }
      onClose();
      onRefresh();
    } catch (error) {
      console.error(error);
      setError('Error al guardar la camiseta');
    }
  };

  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop-custom"></div>
      <div className="modal fade show d-block" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{camiseta ? 'Editar Camiseta' : 'Añadir Camiseta'}</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="talla" className="form-label">Talla</label>
                  <select
                    id="talla"
                    className="form-select"
                    value={talla}
                    onChange={(e) => setTalla(e.target.value)}
                    required
                  >
                    <option value="">Seleccione una talla</option>
                    {tallasOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="color" className="form-label">Color</label>
                  <select
                    id="color"
                    className="form-select"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    required
                  >
                    <option value="">Seleccione un color</option>
                    {coloresOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="material" className="form-label">Material</label>
                  <select
                    id="material"
                    className="form-select"
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    required
                  >
                    <option value="">Seleccione un material</option>
                    {materialesOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="precio" className="form-label">Precio</label>
                  <input
                    type="number"
                    id="precio"
                    className="form-control"
                    value={precio}
                    onChange={(e) => setPrecio(parseFloat(e.target.value))}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success w-100">
                  {camiseta ? 'Actualizar' : 'Guardar'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CamisetaModal;
