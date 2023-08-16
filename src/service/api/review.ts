import { get, post, put } from './http';

export const getReview = async (id: number) => {
  const res = await get(`/api/reviews/${id}`);
  return res;
};

export const getReviews = async (sellerId: string|undefined, page: number, size: number, sorted: string) => { 
  const res = await get(`/api/reviews/lists/${sellerId}?page=${page}&size=${size}&q=est&sorted=${sorted}`);
  return res;
}