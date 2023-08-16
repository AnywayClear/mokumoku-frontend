import { get, post, put } from './http';

export const getWishList = async (consumerId: string|undefined, page: number, size: number) => {
  const res = await get(`/api/dibs/${consumerId}?page=${page}&size=${size}`);
  return res;
};

export const addWishList = async (consumerId: string, produceId: number) => {
    let data = {
        consumerId: consumerId,
        produceId: produceId
    }
    const res = await post(`/api/dibs`, data);
    return res;
};