import { get, post, put ,del} from './http';

export const getWishList = async (consumerId: string|undefined, page: number, size: number) => {
  const res = await get(`/api/dibs/user/${consumerId}?page=${page}&size=${size}`);
  return res;
};

export const addWishList = async (produceId: number) => {
    const res = await post(`/api/dibs/${produceId}/dib`);
    return res;
};

export const cancelWishList = async (produceId: number) => {
  console.log("HAHAHAHAHAHAH"+produceId);
  const res = await del(`/api/dibs/${produceId}`);
  return res;
};