import { get, post, put } from './http';

export const getReview = async (id: number) => {
  const res = await get(`/api/reviews/${id}`);
  return res;
};

export const getReviews = async (sellerId: string|undefined, page: number, size: number, sorted: string) => { 
  const res : any = await get(`/api/reviews/lists/${sellerId}?page=${page}&size=${size}&sorted=${sorted}`);
  return res;
}

export const postReview = async (dealId: number,comment:string, score:number) => { 
  const data={
    comment:comment,
    score:score
  }
  const res = await post(`/api/reviews/${dealId}`,data);
  return res;
}