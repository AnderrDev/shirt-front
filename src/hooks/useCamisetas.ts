import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosConfig';

interface Camiseta {
  id: number;
  talla: string;
  color: string;
  material: string;
  precio: number;
}

const useCamisetas = () => {
  const [camisetas, setCamisetas] = useState<Camiseta[]>([]);

  const fetchCamisetas = async () => {
    try {
      const { data } = await axiosInstance.get('/camisetas/');
      setCamisetas(data);
    } catch (error) {
      console.error('Error fetching camisetas:', error);
    }
  };

  const deleteCamiseta = async (id: number) => {
    if (window.confirm('¿Estás seguro?')) {
      try {
        await axiosInstance.delete(`/camisetas/${id}`);
        fetchCamisetas();
      } catch (error) {
        console.error('Error deleting camiseta:', error);
      }
    }
  };

  useEffect(() => {
    fetchCamisetas();
  }, []);

  return { camisetas, fetchCamisetas, deleteCamiseta };
};

export default useCamisetas;
