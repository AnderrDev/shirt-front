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
  const [isLoading, setIsLoading] = useState<boolean>(false); // Estado de carga

  const fetchCamisetas = async () => {
    setIsLoading(true); // Activar loader
    try {
      const { data } = await axiosInstance.get('/camisetas/');
      setCamisetas(data);
    } catch (error) {
      console.error('Error fetching camisetas:', error);
    } finally {
      setIsLoading(false); // Desactivar loader
    }
  };

  const deleteCamiseta = async (id: number) => {
    setIsLoading(true);
    if (window.confirm('¿Estás seguro?')) {
      try {
        await axiosInstance.delete(`/camisetas/${id}`);
        fetchCamisetas();
      } catch (error) {
        console.error('Error al eliminar camiseta:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  

  useEffect(() => {
    fetchCamisetas();
  }, []);

  return { camisetas, fetchCamisetas, deleteCamiseta, isLoading };
};

export default useCamisetas;
