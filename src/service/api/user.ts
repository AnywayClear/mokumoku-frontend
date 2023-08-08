import { get, post, put } from './http';

export const getUserInfo = async (userId: string) => {
    const res = await get(`/api/members/${userId}`);
    return res;
}
