import React from 'react';

interface Props {
  onEdit: () => void;
  onDelete: () => void;
}

const ActionButtons: React.FC<Props> = ({ onEdit, onDelete }) => (
  <div className="d-flex justify-content-end">
    <button className="btn btn-sm btn-outline-warning me-2" onClick={onEdit}>
      <i className="bi bi-pencil"></i>
    </button>
    <button className="btn btn-sm btn-outline-danger" onClick={onDelete}>
      <i className="bi bi-trash"></i>
    </button>
  </div>
);

export default ActionButtons;
