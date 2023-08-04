import { get, put } from './http';

export const postProduces = async () => {
  await put('');
};

export const getProduceList = async (status: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/produces?statusNoList=${status}`;
  const data = await get(url);
  return data;
};
