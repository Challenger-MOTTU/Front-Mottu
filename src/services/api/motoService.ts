import api from './apiClient';

// Buscar todas as motos
export const getMotos = async () => {
  const response = await api.get('/motos');
  return response.data;
};

// Adicionar uma nova moto
export const addMoto = async (
  modelo: string,
  placa: string,
  status: string,
  patioId: number
) => {
  const response = await api.post('/motos', {
    modelo,
    placa,
    status,
    patioId,
  });
  return response.data;
};
