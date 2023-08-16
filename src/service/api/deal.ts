import { get, post, put, patch } from './http';

export const getDealList = async (
  consumerId: string | undefined,
  startDate: String,
  endDate: string,
  page: number,
  size: number,
) => {
  const res = await get(
    `/api/deals?page=${page}&size=${size}&user-id=${consumerId}&start-date=${startDate}&end-date=${endDate}`,
  );
  return res;
};

export const getDealList2 = async (
  consumerId: string | undefined,
  page: number,
  size: number,
) => {
  const res = await get(
    `/api/deals?page=${page}&size=${size}&user-id=${consumerId}`,
  );
  return res;
};

export const postDealPaid = async (dealId: number) => {
  const res = await patch(`/api/deals/${dealId}`);
  return res;
};
