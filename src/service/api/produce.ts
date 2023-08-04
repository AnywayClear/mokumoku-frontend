import { Produce } from '@/model/produce';
import { get, getUrl, put } from './http';

export const postProduces = async () => {
  await put('');
};

export const getProduceList = async (status: string) => {
  const url = getUrl(`/api/produces?statusNoList=${status}`);
  const data = await get(url);
  return data;
};

export const getProduce = async (id: number): Promise<Produce> => {
  const url = getUrl(`/api/produces/${id}`);
  const data = await get(url);
  return data;
};
