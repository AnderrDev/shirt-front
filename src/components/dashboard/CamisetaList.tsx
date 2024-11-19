import React from 'react';
import ActionButtons from './ActionButtons';
import CamisetaSVG from './CamisetaSVG';

interface Camiseta {
  id: number;
  talla: string;
  color: string;
  material: string;
  precio: number;
}

interface Props {
  camisetas: Camiseta[];
  onEdit: (camiseta: Camiseta) => void;
  onDelete: (id: number) => void;
  isAdmin: boolean;
}

const CamisetaList: React.FC<Props> = ({ camisetas, onEdit, onDelete, isAdmin }) => {
  return (
    <div className="row">
      {camisetas.map((camiseta) => (
        <div className="col-md-4 mb-4" key={camiseta.id}>
          <div className="card">
            <div className="card-img-top d-flex justify-content-center align-items-center">
              <CamisetaSVG color={camiseta.color} />
            </div>
            <div className="card-body">
              <h5 className="card-title">Talla: {camiseta.talla}</h5>
              <p className="card-text">
                Material: {camiseta.material} <br />
                Precio: ${camiseta.precio}
              </p>
              {isAdmin && (
                <ActionButtons
                  onEdit={() => onEdit(camiseta)}
                  onDelete={() => onDelete(camiseta.id)}
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CamisetaList;
