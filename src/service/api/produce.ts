import { PostProduce, Produce } from '@/model/produce';
import { get, post, put } from './http';


export const getProduceList = async (status: string) => {
  const res = await get(`/api/produces?statusNoList=${status}`);
  return res;
};

export const getProduce = async (id: number) => {
  const res = await get(`/api/produces/${id}`);
  return res;
};

export const postProduce = async (data: PostProduce) => {
  const res = await post(`/api/produces`, data);
  return res;
};
