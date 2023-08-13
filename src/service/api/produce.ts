import { PostProduce, Produce } from '@/model/produce';
import { get, post, put } from './http';

export const getProduceList = async (status: string, userId = '') => {
  const query = {
    // userId,
    statusNoList: status,
    page:0,
    size:10,
    // filter:"all",
    // name,
  };
  const res = await get(`/api/produces`, query);
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
export const getAuctionList = async (id: number | undefined) => {
  const res = await get(`/api/produces/${id}/auctions`);
  return res;
};

export const getNowPopular = async () => {
  const res = await get(`/statistics/now-popular`);
  return res;
};

export const getDibsPopular = async () => {
  const res = await get(`/statistics/dibs-popular`);
  return res;
};

export const getNowEnd = async () => {
  const res = await get(`/statistics/now-popular`);
  return res;
};

export const getPoint = async (userId: string) => {
  const res = await get(`/api/points/${userId}`);
  return res;
};

export const postAuction = async (auctionId: number, price: number) => {
  const res = await post(`/api/auctions/${auctionId}`, {
    price,
  });

  return res;
};
