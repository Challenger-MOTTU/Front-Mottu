import api from './apiClient';

export const getPatios = async () => {
  const response = await api.get('/patios');
  return response.data;
};

export const addPatio = async (nome: string, cidade: string, capacidade: number) => {
  const response = await api.post('/patios', { nome, cidade, capacidade });
  return response.data;
};